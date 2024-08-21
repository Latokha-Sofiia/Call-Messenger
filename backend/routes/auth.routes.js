const express = require("express")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")

const JWT_SECRET = "jwt-secret"
const router = express.Router()
const users = [
  {
    name: "Sofiia",
    surname: "Latokha",
    login: "lolo",
    password: "123",
    photo_url:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUSExMWFhUVGRgXGBcYFhUYHRoYGRYYFxgaFxgYHSggGB0lHRgXITEhJSkrLi8uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICYtLS4rNS0tLS0tLTAvLS0tMi8tLS0tLS0tLS0tLS0tLS0tLS0tLy8tLS0tLS0tLS0tLf/AABEIAQoAvgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYHAAj/xABCEAABAwIEAwUGAwcDAwQDAAABAgMRACEEEjFBBVFhBhMicYEyQpGhscEH0fAUI1JicoLhM6LxJEPCFXOSsjRTg//EABsBAAIDAQEBAAAAAAAAAAAAAAMEAQIFBgAH/8QALxEAAgIBBAEBBwMFAQEAAAAAAQIAAxEEEiExQVEFEyJhcZHwgbHRMqHB4fFCI//aAAwDAQACEQMRAD8Ayj79CrXTCqh33qHTRO11OrCiI87QTjk0jjk0rSJrSSsKJzV+oaw4EahE0cyxGtSsMAXNMxThFvhyNWJzwJUKKxuaI65FqFWukUqolqq6riLW3ZnlKqTANBS7+ykZjOnQHoTr0CjtQ6z4Z6/Qf5olw5GAPedv/bcDy8M+YeqrNxFt2TBMXiM6yq99J1jmep1PUmhiadTTQCZXuNNIaU001QyYhptENYeRnUciNMxEyRshPvH5DcimuvDRAyp+Klf1K/8AEQPPWqGWEgNeA5V6un/h32dSy0nGOoCnXBLKSnMEI2cjTMq0ToBO9CsbaIatC5xMjh+xONU33v7O5ljNoZjLm0qgxDJQSlQggwR1Eiu4r4s4lfiKj5qVP1j4Csh+I3CQtKcSkeL3iABmEamPeFLLe27DdRuzSgJle5zivV6vU1EZ6vV6vV6emrfdiq9xc055c15pqafrTaI/qbzY2BEbbmrBlkC5pzLMCmYkqiSkgc4MfGrE54lVUVjJ7iPP8qibcB8KjAO/8J2V5c+nUCoFKppVVwoxFbLSTPPApJSRBBII6ixodSqJxhzJQ5v/AKavNIGU+qIH9hoMmq7uIsxhLLBWlCRqp0pnlKUX+p9KTir2ZwxYJgAchsPQQn+2jODwGnln/tZVAc84U2frVQSTc6m586CTzPeI00008CmGqGeEQ0QhlKEhbgkkShuSJB0Usi6U8gLq2gXpUoDYC1gFShKEG4jZaxy/hTvqfDZUISpeZZM3lS1Hc8zuegvVCZcRj7ylmVGTECwAAGgAFgOgqI05XSm1UyZddj+B/teJS0f9NMuOmYhtOonaTCZ2mdq7aAhQIClTrMRMWGVGsbAWtpNZj8MeFhjDJWQS9iiHMo1DSCQ2JFzKpXA2ym0CdzjwsD/TAgHVpGW8GJImPODalLGzHqFwJkOKpKbFRI2kkjyBOnyI+dDMo75pbJ1UPDOyh7PpNvImjeLYqxSfgZUP7VSVJHK58gKp8E9CxSpmgOROX8Rw+RxSYiCbHYcj1GnpQta/8R8FkxOcCziQv1Mg/wC5JP8AdWQp6ttygzGsXaxE9Xq9XqvKS9aazGrFpuKXDMwKR93lWgTniPqgrG4xjy5sKFzqSbEpPSQa8szThibZVjMna/iT/QrbyMjpVwMROyzJzPd8lX+oP70gBQ8xYL9YPWh8U0UxcFKrpUJhQ3ibgjcG4p+KbgBSTmQbBURB/hWPdV8jBgmo8M+BKFyW1e0N0nZaf5h8xIPMQTjqKs3rFw/iQ6j+UODzbN/9inD6UMBVhgmcj6EqggkJJGhQ4MuYHkUqmoMFhCtxLRsSrKr+WPaPoAT6VTMqYYhOTDON+84hDquie/bQ2PgVq8lJqnyzAFydPoKusMoO/tb2ie7CUDkO9aCPRKQj5VWkhKSrdQt/Kg2HqoD4edBzLyB4geEbanmenQU9hASnvViRcISdFqGpP8id+ZgcyEwWHzqOY5UJBW4rkgEAkTqokhKRupSaIxCspDi0DMQO6ZN0to90rB1sZCT7RJUqxhdSZYDzIFN/918klfiCJhS594n3EdYk+6IuB3nysiYATOVIslIOyR99TuSaRxSlKJUSpRNyTJJ6mpMDgXHl5GkFajsB8zyFUPHcsOeoNFWXZzgy8XiG2E+8fEr+FAuon0BjrA3qZPZvEqVkDRATdS1eFI6qUduW/rW67JMIYJaZVeP3jxAH9SpNkJEgJB3I1Ipay8dLyY3VpWOWfgD1/adFbw7bZFlJBT4UjNASE5QFhBBXAERMJgCi1uJgDvSNx7XnYG0edumlSNISptIVlMDIEznFjYgkBUxr5VUY8Qk5kCB7K0kFE2gLST4NT9lA2oLAwqkEyr7QLdA8SUOJO8i/KFqSRm09seVZEuDNIBHQiPpr51o8QS1mUnPCgJU05mSf5ijY9N+utZt/EkqvB6wAT1MRJ6maFiN1mQfiLh8zGHcHJaf/AKkfP61zY11TtOc2DanZ0Dyltf5T6VzHGN5VkRHSj6duMRLWJhsyCvV6vUzE5sHnIEUCtdPeXNDqNaiLiGvtyZ5Sq8nEKHIjkoBQ+enpFRKNIKsYkzQxhSCTlhBIgoWSW1i1iomUcxMwb5kxUeMweQzBCScsK1QqJyr9LhWihcbgQJQSYGvLf0/KrPhD3e/uFAqzDKiN9wg8gTofdVB0zBS7HHMpnPcBcktlJ9pqSnnkJ8Q/tVf+5fKjnxldxKgLqCgj/wDtckeTal/Gtt2Q/Dh15SXcSChtMggggrSRlMjaRHxNdBXwfCMJKgyjw5bkTcAITr0gVz+t9vVUP7tAWY+nX3jVGma3qcd7NdmnnmnhkIRlQiT4QYcDhuf4im55EV7EdjFFaUreRJ8SonePgNvhXQ+L41SWxiMRLTWYBDWhMkJ09Z8hWcxeHGQPuLyNO+MAyVqSQkhCUi9iooPW8iJqqX6yw7mAUenc6Kj2bpUXFpycQFPBGsP3Taf3y3IdKUpze6VIUpN5yoICEGwK1KVMBJr8TwRgKWt51OeSVAupUcxuQUozLJvqR1qTjHEFLzJSChoklQmVLKf4yNgIAFxaZiIpcK3AVOgKvkAPhEmtWrjljMu6tQfhHEJwOIYYWFpbDikmQViBIB9lvUkH3l2n3RE0e7xZRCkAoaCkyciYEDKNrlSkg+QSI9qwqeGHUjeIjkEqV8PvUCsMokKAjNnVPIpmQOV/DPnU2OrRMErxJ+IHELCUByE2ABJsdRp0Iv8Aer3g/Bzhe5X37ZcV4iIUctleImCIT4gLXKha0LocS0cogwOX8t/8ged4onh7/wCzrClqlKZzITBzQYME2CZAE9LbEqIoWMG9rODOjsYLFJCVtONvMlNyZBUTBMpBBBB0uCI1JMB7YVMSqNA07IKQRo094cwMaFXmDFZjD9uyQVKHdNTCUgZ1Eza1hJ6TqJm6qsEcY7yQwlC1RmAUm+xyREgWNgbHyqGPMug4iY/DMpMyW1bhIyrBO5yQgjrkg7mszxDD5VSHELB0KSfmk6eQtVm5xxDwHe4RoKuApCloIIHsEpKgTbWDOsJtOX4hiRn8Kp+M+pygH4UPBzGEYSz487/0Sf8A3k/Jtz86xHEcOSgOgW9k+cW+ivhWn43if+gQN1PL+CEIA+PeH4UP2OaQ+tWEc9l9spB3C0KUpBHW5H91U3+6Uv6d/SV1Q3Mq+sxdeq07RcDcwjpbcB/lVEBQ5i5qrp9HV1DKcgzOZSp2t3L9xVQqNOWaiJra6gHaITSRXhUiE1QwBMO4Fwp3FPJZbEk85gReZFx6V2fsb2Eaw76Hl+N6DJ2SqCCYsCesCSCYExXM+wXEjh3ypGULIhKlBSgL3sPrXc+zeNzd446tGdoBLsJy5VEBQSoZj4oI30IsKzPaFdj1gKcDPP0gAWa0L4l683MIFgLk1RcQ7tWISgkQ2MxTzV7pPOPFQPaHto22kpa8S/SPrQfZbBhaFYlyZUZknSOtL6bQ1Juufs9fIeAPkP7ma6XlW+GVvEgMZxP99/8Ai4FKVwYCVPKBMknXKIPrWe7WYtTq1OpbOQyErIJ8IjwtgWSIIMxrm51le2nbF7Gurw+GlDCSqcpjMEmM61bJ0t13kVm8HjMUxJadzCQSkEqEjQwoenkSNCaY3LGRfg8TV93CcokrJAIyqvplEe0MwAvHsoMxrUmHYSFhKgfEbCCL5QZn3hChpawpvC+LoxSHJIS5GbulJN0yCtAvsZIVBgG+hBuuG4dMjLJKZupYveRO8iBpy+KWstFakzQ01fvufEgThCSkKBSVFQCf5bk32vv5GpcRw/OFGIF4AjdSQd+cjzmrfDtFJBk7yTIvKSdbAWPnmPKjHcPNzdMm0+1BsnobxIrnX9oMG4MrqdAuczLOYDVSgLlBAsPCkjPHQlURvlNU/EGiogxqYHnbQaRKjB5J61t3sKVHWQfFA38XhGu8Ln1qvU0mAVRYZQepUpM9Lb9KYo15PcVTS7TOe4twg2NwSJnTax+/nWkwPBcrSXzjEJSQD7UELmBBkEH2dPqAQe52WaxGG71tWVxHeDLH8/hMb2VoelxANYzixU0UNg5gkEAXOpgx1M7bmtau1bOB3JZCuSZsMX2jYQmHF4PErIgq7t1JWLDxrQ1lJiDMcraGsfxHjQcMJbCByzKXPqq49IoJyDNr66k6a5Z1gScu19rVr+wXZppYfxWICVJw/hShV0Fa0yhSr+JIEGN5FGwByYPJPAkH4gspQzhu7TkbIOVMkzpnXJvdUjySKynCnlJczJVlKRII2MyD6G9Xfb7jBxJw7oEIDKEAQEjMiQvKBYDMTEcqzmCnxHoaqB8JgdW/xD5ATt3D+44rggp9sZxKFkaoWNYOoG/rXL+03Yd3DL8J7xBPhICp9QAfjWo/DTiwQ9ikKPhIQ5HlAWf90+ldFxfDc4CkkEG+xrnG1T+z9QVH9B5APXPPHpH9OKtSmLOx5nz8o00UlSITX0UznWMVCKlAiiuD8KfxTndYZpTi9wkWSOa1GyB1JFdG4L+DSyQrGYlKRu2yCo+XeKACfRJ86A9yrICM8ofwn4aXsWXCIaYBWpZEpCo/dg8zN43ANavimMCU/s7GYN5lLUVe264oytxw7kn0AgDStseAsM4cMsENtoFki8ncqOqlHdRM1Rt4JpCS86QlKfESbRF7zWddcW+kbq04XnyZR8F7PLdVmWCE6yaqvxV7ZJw7X/p2FV4o/eqSfZBvlke8d+Q86B412zxmPd/Z+HIcQ2JuhMrV1Uf+2nkJHU7VzbFYVbWJ7rEJUhSXAHM2vtAkk72MzQw244MOaigzNxwlxPDsEVd0F4l9KVpUoJKGwSQFlKpzLHuiIHtbxVC3hnSsNpBKlkBW5KvaVJ6ZhPVJrqfaDse4/iEvJCCw22gtyoBJIGVBUf4RY9RIons5hcPggEIX+0YmCpbpBygqOZShyBJ1pO/X1182foB38v8Ap4lRU/Sd+p/vKDE/h82MP34Jw61KVlz5lr7oEhMgEAqXEkxYECLzQmGd7ooacXM2zAeKQdQkm/lerTj/AGrGcwovL0BypWkHpEX9TWX7UIztF1ZClmDoElJ2iNxWW19upf8A+g2qehOj9mhKKmA5OOZq3saEhBzFRURJN+RnLBIm3hIsedqNaxyCEguCQJAgpNxqQrQ3mNelorkSu0zxbCSZuLnQ5SDFrfoeus4R2lTikhogIWNQkjxjlJSTEkgxsTNqBf7NdF3H9cSw1dVp2ib1txCgEhVstoEBKdASTcyNPXnVXxnhOcQjRItAI2JMzbfTaL6xVanGkC6/DOiURewk5YAVAmJOquSorn+1CmyAFlVzbQzyHujlb+ExEzSlWmtDZrkOqjnMCxz72GcOUnKScxAgEk6Rzt9fOsticWS4rLqSSDuJ1j51r+KcSQW7pRmIklYK1CQPYSPCL2mLxqawb2JyEkXJ3/4rotDlhkjn95narK+Zd8B4ti1vpa75xeckBKj3kHKSFJSuQMpAMDUCK2vEeHrw3DMW64kIW8hhJQmwSEuwlfQqCjCdkpA0ish2AxCji87aBnbZeUlUTkV3ZSlYEXIUpMdTQXaTtZisU33T7pWAvMJge7l92BaPiTTpGTgRQMAMynfeK0oBk5RAnlJMDpJPxp7C8s0h08qGeXUgZ4iLneZqOwOJH7Wc3sugtn+6E12PspilIQWHbluwPMaV8/8ACXcq0R/EK7Kri4QEOETnQJjnA/XpXP8AtvT7yAPP+INdV7iznozkKBR3DMGHX2WSrKHXW2yrkFrSkkdRNDtIorCOZHmVwVZHG1ZRqcqwYHnEV3b9cRfcN3M7vieKYPg7CWm2ihBNiEqJWrmpZHiVG5P5VmsR24/bDlacLcm1jJ84mqDtxgsdieJLwzIU8l9ttRbmEIKEgFcmzcKm+8xea0v4ffhIcO4MRjVpWtPsNIJKEn+JajGc9IgdaxSGY5m1YtdWFHf4YWxwrFhvMk5gb+NV4O9vZttcmRpV6x2TTiERiSpSLQ3mITYamDJM31rTLUn2dIEwbQJIB+RqZlQFR7oZ5gvfMOoLwTgbGEaSyygIQn4nqo6k9TWd7V8QwOYd5h2HnLgFxtC/MSQfhRva/j3dN5Ue0qRrpAJ/XSuO8Zxqu8XGbmCFFJNp9324t1tymg313WuKquB5Pn6fL95m6nWMj7V7l9x/tQcgSkJQI8A8BbSOQSkgBXrAPwrD4/iDhBBR4byA4bnmSmxE+XWaBxmK8UnKechM8yRA18jQqReQI8gPtF6NX7JWoep8yKmsPxMZP/6gsRMDlYRGsWvTFY43B0Vyt/yetDupnUfJI/zNBuIOxj1qradc9TY09zIOIM6m5HWRSNPKbIUmPIgEHa4NiCNqlK511G9ROJkTRPkZRh5WaTBY5rENgOZkrQCBCgRBNiM85SDuIsbztVYt0oJSEkoJ1J8R8ykwRfpMzAmqlJipVOc5+VCXThWOOvSXOpLLz36zYcAyKyBZEE2lAVB/mUTH0NF8U/D7FPLK2UtKb/lUkRuSQLekz0rF4Z7YrAH9IPy53/4rVcL7SuMgD9pcy/1BJ8hqmOgnzAEUldXdW++ojPoQY0tiWptYS77EYZWBYexDqJQETluCpfeZAFGIiAq0k9LVzvieKLrjjhgZlEgJGUC9glPugCwHQVt+I8fxGNbVhkd2Uq3WUNGLEypcZgItF42OtAN9kmkJU25iEHEKkJyyUJ0iVECSYOlhNHpvHdnB9ItqEwAF6mexTGRtpW6kyfWY+UVXb1pO1qU96lpHstIQj+6PF5cvSs93cTTFLblzMxGyMmTcNEup6GugYnFyhtA1SPlWE4QPEDVs9jCVlSTG3pS2qr944+US1KF7B8orLCjolR8kk/SrfsrwBeJxrDKm1BClgrlCgMiTmVqIuAR61XtuurMBbqzyzLUfrXQfwZ4f/wBWt1awVpQQEhWYiTBJIMeknrFdGTwTIB5nVeHcLbw6nVpAzvLUtR3iSUpHICSY5knehcfxMJSsuh1tIElbZURA/puN9otrRfFUhQg/LaOVZvG4rENjM1lfRnAUgmFZIMgbTMa8uts8rgTW3FzknJk7WL79CizjEO55IS62kpSM10lKcqraEKPnyqLEP4hpKitIOgT3S88iACrIsJy7+EFVutUqxw91/wDeJLL6oagy2VKIlCZ38QEdUp53ExHDUJSDh8atJJgJcczpUSlWUKSq4JAUQRrlOsTQTCSq7Q45avHcLQdp23g6CLEdaxnFXUqJPO9rXPMTE8j8Tz1XGMUQoNviJByrGoO4I3gkSmdwQYIzZbieBUmbSk+K2hF7oMSB8wQQQNKd0pXPzid2l3WBxKh2TvG2g26R5286hbkWn0iQenI9PpRzCecyNNLjbzikdZF7dbfUflei3XAGatOhymZXrc9ev6FIY/x+tKV8b/nURPI+VKNzBkbTB8S1uKYy9GulFByLED6VC/h9xQivgyvIORB3UDUaVHNPB2pCmvQR55Eeh6BAAPmL+h2r2Wb6VEDTgkeVRjEkEmTMvLbMpUR5KI+lWKeMrVAXFt4Avz8+tVY9PhTkqI1HwobIrckcwgYgYzxC3HiVSdfOanOHzJMcqCQZqz4e5tQ3O0cRZqc8iAYNUUTpSYrD5VyNDeiw1mAIrzMDzFrEwcwzO46IkJRMQPAidhCR4lchClV0/wDC7u8NYq8azCgYTltunVJ38UEDYaVy93iK1EJaBTPhBHtkE+ynKIbBt4UATuVa1f8ACMQWUlDMFxAv7ORu/tOKJyzmGmhIAmEnNtqQcgxWxSMbe8ztLy3EuOqN2syQkbiUyo+V0/A1UcQZSvu1NLKFd43MbgrEgjnY+taLgcLwiCVhw5RmVrKgL1j+N4FbS87ZtnSuOiAtcD1v8ao2GyPIjWnzgH15lNi+KrCFjEspeyvDxJACgCHFBYtZQ7tenTfUHHBCnFJAIQ9qi6hmMLlobLCxIRoqFJBBlImTjStVpBewyFjo6gh4pAO+VwjyFVbipazA7ERqIQAFAc4BSudpe/iNJMs0JH36XAphw8tDmAtKHWFHVMGcuhSrrmIzCCmWXdjZQvEgQpBtIIjlIA3Ah3EWS6hLyfbE6bwZWBA5kOD+p7QIAE+BfD6IUQFp9lR0udDySTryN7eLNCnHUIneZWYjh5QYIHmNPMcj+rUI5hdbVonGzoRBBIIPMapVQWLZANrfr7fqxpW0uWm/p70KYMyOLw5BnXy+oqveSeX6/OtHxFnX9CetVC0z+X+fvTdYJEzNUihuICCFdD1pyCU2+R+xp+IaGo1/XwqFWJixq5WIHg8wfEi/KogaetyaaPOqEQWeYhNNinzzNezx59arLYz3PI6g+lSJUDpNRqUVHQDyqcMkCT5jr5VUwignrqK2sUayYoFpxJ1t+udHst25jzoNkLWm7qTl6RFSYd2KBcRvBpzaqFtGIO2sHgy6LYYTKyQ4oe6Rmym2Vv8Ahm4Lp6hIVc1Ah0rSCpQaYSfClImVRByAnxriJWo2nUWTQBOZUrUSSZUomT1MnU07xPLASNBAGyEDmToBMkncknWtr5zL+Qn0X+FeKbXgQhsZUoJGXNKoOhVpc3Og8qsOMsjKocxHxsT8K5p+EfaVjDvKwpWSHYAVojMNAnck7qMTYAQJPVuKYTNcVDf159ZenhdvpObY3hym3O8TEoW2R6toS4PKGwrySapE4fuy+gJkNKS4lB95qSMp6Fpy9dDxzXiNtwb9JEfAkeVB8Q4YguIXGqciv5kKlJB9DNQyZjav6zA8JbKXXcP7WWVon3sslPo4gqRA2eNQtYbunikGQT4TzChmTPUgj1q54vw5TGKaeQNEgf3I8H/1yVPxHhwEFOiCUj/21HOj4Sb9RQSkMp5kTKc8D3xAT/MkaIPUe6f7dIyh8QYBTMafSrV3DxCo1E+o9ofOf7oobj+ISlnvDqCM3Wfe8+fP1MeFeYQWbZjMZqen0qjxzoTaKn4pxXMTl2/XqKpUkrJ1M69OtGAxwIKy/MR18k2poaMSfjFGjDhAOYgEbGfykiar3nSo62+A9BVnr92Pj79IvuzzGKimE05SIpW2yTSxkgEnEYlBJozBYArXEjwxN/lSBELCRrfW1zpT8QRECYieUkW0Hr8aA7HoR6mhVyzjOD1HJdQhekiIN+v60qPiD+dQjQADzi01ChE9KlwDGdUVXCr8XpJ3vYPdjomRtJE39as3uGWlO0HcAiNiNTUWHwgkyD6ecG28SDQ5UUrUEkgAkWJ2tVCSx+Ey4rFafGuc/cSVsRrfyM1MGgdDQ6EHWikIO1VaC7jmWc0kkJQNVnQdAPeVySPkJI87ibFCBlQYtuqPeWdzyGg2vJLMQ+VxYBKbJSNEjpzJ3Jud6hmtaZEkaWQQQSPLX0rr/ZH8SO5bQ3ijIMZTclKIEEk3IIkyTMQfeArkeFQBLixKUmAk++vZP9I1V0tuKaFLdWbyoySSQLaqUTokankAOle3eJBTPPmfTfDeL4XGg904FKTqNCNripcXw3wiNv1+VfNWH4gWyEsLUmDmW4CUlREgRuBcgTfxEmJgdD7Nfi84glOKT3jeoUkQsDMlN9lak/evZ9JILDubvjHD86Da4hX2P66UArDeADUFIH/xsP8AaE1rMI+1iWkutKC21ixHI7HkelVr2CKQU8j9f+B8a93GEfiUjWGlBQYG6SdARpPTUevSuXdrOIFSi3eEEg+hggiuo8YZ/cOXI8JuOVcn49C5WklSkgBcx4h7KV666JPWDuac01WVLQrZK8TLLRKgARcgb7mKsFtQTbKlG53I+VMwKEh1Kl7XiBsJofiOMLk9Seek2/XQURNtSF27zwPp/wBipyWxAnnSo3vO9eS3fyIqfDYfNYa/np9qsm8IEZZuSqefsj/IpIVM3xH7xqmkueJX8TaA9CR8KXCjKSTtlt0NoqHGug+ck/EzHx+lEqaz5Vo1MZgNr2n5Upe4LEx6lPjJXsY/P0OIjaAV5jMBM/X/AJoV/wBojqQI/W9E423hHOCfSI/XOq9U2pZeeYTUsFGzHnJk7ggADeZ+n50Twt/u1AnQ2P1B+XzqIN5oUdxf01qR1PjSNLj5xVWwRtM8gZG94vjGIY/+7UpWqVD6zb6UAy3JnnRnExZI5Ej0Gn1pmAgKAOh360JThMwmoGbNvj+Y9lF6P7jlTlMw4OShH1o1hIETyj4H/NL2WeRB2JtmZJpteJrzaCohKRJNgP1p57VvkzBAkoBcUlCdEgxJgAaqUo7cyfyFK++AO7b9m2ZUQXCNLbIB0T6m8Q190JHdoMi2dQ98jSP5AdBubnYJHqst1JQYT1P0/U15BsR0/wDIH7VG4q/lakBqZE0fY/ta/gHg42SpBjvGybLH2VyNfSWDxDeJZQ80ZStIUD53g8iK+ThXcvwMKu6d8SspIOUiwO5Bn7cqnsfSULhWHzmi7RcLC2lJM84AmuPcSQptRyiNttNCK+guKYQLSUmb8q472xwSUOFKB8TfzM6Vqez7cqVmpplNnwzCYtCUpJHtK0tfynU1VJw5Ko+PoL/CrrEMkHMTJFhaw5RzqJpmA6ogxl15SZP0+dXuQOQT4g2oYtgQTgk9+CNDI9IJ+gpcS+pwNge1mPncAEmrTBYQhFtQ2Jt77ml+iRr/ADUDwJsKcKd03HrAP2rMvsZUCevP7TU02mICof8A0f4/gynxbGWfP7x9qXCOqQTl3iR8KL42ghZke8flAqROHyuDcED56fastn45lxpiLzs4wQPvmMxLWZIUJiD8QYv1v8qHTh5SFcyB+dXLOHupHO4+J+1qHwDFygj2Tm8+f2pb3uAY/Zo9zrkdjH6j8Mi4egHwaEkx6EEg/Oh8e2c0crVOpJSZGqSSPWxHyorEoChnHvAH10r27DZgmr31FPT9v+/4g3e94kJV7Q0PPn60reHtUmHYuKthhYE0J7AvAlPdFhlu5HhTmAnUb/nRjzEiBzmvYbDQbC1WZwcgUjZaA0U1CnGJzkmiXj3YLY9tVnD/AAj/APWP/Lr4djPmDkT3nvH/AExygwXPQghP8wJ924ldVMHqepUmm0k16RPTRGFZznKNduvQdemvShqmwyoUDE30BIPxGnnUSG6lxgeBYhSwAwvzyLI9SLD1r6E7D4TuGUoyFNr5ikX8gT9a5DwftK8AlCb5fZCUla1HkColWXzM6X90de7GrecbUp1ooNsuYgzztFot/ivNaoJUTDay99QgIAxnr/f585qcQmRXM+22GQlRSlIKiQVHl0nb/NdNymL1Q8X4aFoUFQEAFWUaqIBPiV58rnnRtLbsbM63QWhHy04mhkFRccju2woi2qtz1t9qznGHlLuLBQBjlE785NdF4vwr92fISBoCTMD5ViHsNIWCNJI+/wBqNq7CBsz8zOgtpDLgfn4IRxTwstqQbOQkkbZUAAfNRqq4QzkdSvQE5D0zAR5XIqz4SsOMKw6ozAgoJ52Ef7Y9ahfwpAUjcjbmk39YPyrN1NuWDQqV79tnp19f+wftFhpUTH6zH8vnQuFEpTzT4T5bfI/7a0GIhxtLn8Y8Q5LFlfnVX+ywojmgkR0NorOezsRlqQbPer57jyf9NR1iD+fxHzpEMQ4qN5j+6fuB8aJS1nbSd4IP9Q1/OiVsSCrfKPsaTazHEZKg4P0P9pUoaGYg7m3Sae0xHhPlRqsPm8Q9aLOFkg84qGuirqBK9rC/Kr/CYQKSOtOw+DzROo1qxawsbUjdqMxO2wKJE3gMu30qLGuZPaUlPwqPi3Fw2IBBVyGg6mLk9KyWMxilGZg+Q+leo072fE3U57Wa7B2iZ/EvFaioiNgBolIslI6AQKir1JXZRCeNJSUlRPRamw64IsCepI+hqJCCdB+up2q+4B2fU8qy4APiUkA5fNaoSk+U1R3CiCutStSXOBNb2Jw7ri0tJPdJOzaQFK1lRmyE2PziSJrsfD3cuVCFfukCPeJUdyVq138+e1ZXsphcLh0EIUFq9lRzTeLidybegG1abDcUJIEhI0AEz8AKWXS6hzu6H0nP06mv3pcHBPy/f6/rNE2qROlA8QZzIWNykj4iKIQqwAufvTVtc7nlsKaGVnUUN0ZiOL4P9zKRplJHSCDPx1rHY7hFpA930PL511HiTFvDBJsbWjcfSstxzC9yhRToV6ckqTMVe2wHkzqNJqs8GcqVhIWRz/Qq5S3nCQr20pBJ/iGXKr10NGY7ABae8ReNeh5Hl+VHpweVTRI9olB6EjL85rItswJoIVTqZnhrV1NHUkEeeh9dPhUK2yPNJJH39DV5i8L3bwV/CsT5UuKwPjWORVHlP+aQsuGcwquMYlVh2siimPAqD5Eix+cVYtMwkDeI+E3ozCYMKAChcCPMD9Co32SHBAsIA/XrSTW7jiVa4DgQLBYfxRsQfjVlg8CdD50UzgcpBqXiOPQ0LkCNfypd7Wc4WZ92qAj0NgfSqjtDxBCB3ckq/hTp/cdqrcf2kWr/AEwEg2BOvmkfc1ncbjiPDMqPtKN9aa02hcsGaYWr1Zb4VjnnbyoidQOu1qr33pNz8LfOhH8RE3knehFLJNdBVpscmZgoLHJnppK9SVoS89XppJpKrmTJm3PL1+9HPcVcKQ2gnKBtaeZ6D9Gq1JFFM47KbADyH359asmM8mVZAexN72Kwz7SE5Vob7yVKUtAMi2VCJUFSAConTxjlfb4PCuuGf2lKEjVSQNPMmuf9icHisU6l1alpwwPiUFZQY91MkFWwtIG9dCZbwqFyoqej2WgStI6RofI1v6Yp7rFeftn/AFMjUaTe+5sZ+k1PB8YFDusMsry2W6SCJ5SNT0HxFXLiYTkCrnVR19KyvDeOvrV/pt4XDoGrkJzbAJEhIjfWIjWtQwnKkKJK1ruJtba3uprJ1SFW5/n7nqaenXYoEGxZCAhG61JAHITv8z8KoOKpzFbatVkFHmNB8Kug3mdzqMlIzekwPifkOtZjjSypxLg/7Zn5zWVqH2ibGmbmUnD+HKQ/liUn2htl51Y9o2cqgRsoqHoox8gKv+JYQBBUnVZBnpqKreNozDPz08gKxtVcF4MfXUbmBme45hs+VxOix8+XpUzGEKnAT7yb+cAn5iiuAtFeZBEgHMDyJFx9DVi662yUhRuToIkTqfKsfUXnOwdwp1GBiUOOaKVJA92iFNJSgKOsUJisUpTuliYH69KF7QK7tuX1SY8LehN9+n5dKqqFiqnz95Wy1iABBH+0ISSR4tYHM/l1rLY7GZl5njmNzl2HnXn8cqCpCReQI06/Cql4QSVmVGCR9jyrd0+lVPH8xZqGf+r/AFPYrHFR8I0sKBcJJkmJvU7isntWtoPuaHcJInQbaVqIAOoNtOi99yBUUi1V42tv1pVdbmj5i+O4ykpK9RSYhiepK9SVUy0UUXgMPmUJIA3JmI6gXPpQkURh21HT46Af5+dSpAOTLouT1mdP7NkOocQ2648UAZzBSlOyUoEZUgRon4VYMNYpNmE92TqowSf/AJAmiPw5aLWBkBSy4olMJ90W+BMnf7C3exS20lXhSrQCyz5xcfGun0+oY1gbRNI0g19ASPgHZU98jE4x0OEEZc5nMrZKUnUA7b8q3zTwWuDrqock7A+fzg7C+G4dwlxH/VvlS8QuzKVEkpBsFQdzsNB9NhwjCdy1BMrVKlHWVnW+8AR8aytc245Jzjjjr9JjWWBWxEwjwW46n3lZSPISPuKExOBBSUjZWUnrAJ+tQYTFBCn1i6gAB/cT+VLg8VmwsmxC1An+Ik5pHx+VcprLxs+fMmvUjxJMYvOlWQzBAA5RYD71VcRVDQSrX/NH4T902cwOZZKkp3iABPLSqXGoUteXVSj8Olq5t3LvyY1XaY5GJ7loBMd4qT5SdT1iKD4dwxTii4szc3P1J5CrBXCu8cCQbbnoNTQXaziiUthlmMh8Mj3zMBCTynU0JSWO1O27PpNOitnbH3lBxftEllRDKc7nuqPsibSBqo68qy/GX8682JWMxglIkm1gLWA6VNxbHNMlSAQp0QVKGgO4HlWWDZeX01UeQrodJpFUbuvn5P8AAjjKqHC/ET4hmO4jCUhAy2gAdTOtMQ0G0DNGdRm+02/x8aY6zlOdW0kAQY5E/ChVAuKJna5Ow+1aKoMcdeZ5nZWyRk9Aeg9Z5KM6is+wk6nQnYeU7cqidXm8R0Gn+BtU3t+Ef6aOVhP3NI+oACI5AUUdxZhlSfHn5n+B4ginI29dajK6lcETQ6hRREbCRGzSV6vUSIT1epK9Xp6PQqP1+VW2EyphTptIlO56GZ22M+VVeG9r0P0NW3A0BWJYSoAg5JBEi4k2POoxkgR/RjnPqcTt3YDHLxOGLjyEtNghDSRMEC1iq6r22rWpwLaCCUyoaDWPJIsD1rJ9nTONbSbpTOUHQQgxA2itfiD+5UdyTJ9a07SyEDMY9pqamC57Gfz7SMI8XeruRISkGTJ+/Wq7i3Ey0DPieX4UIFwgeQ1On/GruBnwOncGx30FV/BBmefKrkEAE3gEwQOQrM1dh/pE43VWnftEIwvC3Bh0puXXlZ1nlNk/AR8TV29hm2kpSI8A8IMeqj1JvU76iFLgmyDHS40qg4Yczyc19Te/1rmfaDBDsHZ/tj8zGqAFOIY6gwVBJJVaTqfjQ76UYZHiUgOK1UogAdBO1CdqnlBTUKIuNzzrL9tVk4mCSRlTbbVW3oPhWTXRvOCfwTo9HQHYCT8e7UJUhTGEUSBJeegiYFkI8zvymOdZfi/FQHWz7jDYyp/nCLT/AHXqXAj/AKZR3ld/7azvaQ+wNjH1FbGm01YfaB6zdVFppLCU7WGU6oqMxJzKjnf1PSrdpkhORIypiJtJO8+VG4y2QCw5DT4VFFz5fetFrCwhatMtZPk+ZU4zCAKiSZvAiSQLelRu4cC2kxYc/Ont2aKhre++vOoMeox6fajrnqJWFQpfHfP3jcU8IyiALACgXV3tTUa0x00wqATMtvL8xqlU0qpDTTRQIkzmf//Z",
    id: 1,
  },
]

function setCookie(res, token) {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    httpOnly: true,
  })
}

router.put("/update-personal-data", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const { name, surname, login, password, photo_url } = req.body
  const user = users.find((user) => user.id === req.session.user.id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  user.name = name || user.name
  user.surname = surname || user.surname
  user.login = login || user.login
  user.password = password || user.password
  user.photo_url = photo_url || user.photo_url

  return res.status(200).json({ message: "Personal data updated successfully" })
})

router.post(
  "/register",
  [
    check("name", "Minimum length 3 symbol").isLength({ min: 3 }),
    check("login", "Minimum length 3 symbol").isLength({ min: 3 }),
    check("password", "Minimum length password 3 symbol").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные",
        })
      }

      const { login, password, name, surname, photo_url } = req.body
      const candidate = users.find((user) => user.login === login)
      if (candidate) {
        return res.status(400).json({ message: "Ты уже существуешь" })
      }

      const user = {
        name,
        login,
        password,
        surname,
        photo_url,
        id: users[users.length - 1].id + 1,
      }

      users.push(user)
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "10h",
      })

      setCookie(res, token)
      res.status(201).json({ message: "Ты создан" })
    } catch (e) {
      return res.status(500).json({ message: "Registration error" })
    }
  }
)

router.get("/check-auth", (req, res) => {
  if (req.session.user) {
    console.log("/check-auth true", req.session.user)
    return res.status(200).json({ isValid: true })
  } else {
    console.log("/check-auth false", req.session.user)
    return res.status(200).json({ isValid: false })
  }
})

router.post(
  "/login",
  express.urlencoded({ extended: false }),
  (req, res, next) => {
    console.log("User login attempt")
    const { login, password } = req.body
    const user = users.find((user) => user.login === login)

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Неправельные данные" })
    }

    req.session.regenerate(function (err) {
      if (err) return next(err)
      req.session.user = { id: user.id, name: user.name, login: user.login }
      req.session.save((err) => {
        if (err) {
          return next(err)
        }
        res.redirect("/home")
      })
    })
  }
)

router.get("/logout", (req, res, next) => {
  console.log("User logged out")
  req.session.destroy((err) => {
    if (err) return next(err)
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out successfully" })
  })
})

router.get("/personal-data", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const user = users.find((user) => user.id === req.session.user.id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  return res.status(200).json({
    name: user.name,
    surname: user.surname,
    login: user.login,
    password: user.password,
    photo_url: user.photo_url,
  })
})

module.exports = router
