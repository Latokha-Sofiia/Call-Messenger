import React from "react"
import PersonalDataForm from "@/core/constants/PersonalDataForm/PersonalDataForm"

interface PersonalDataFormWrapperProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    name: string
    surname: string
    login: string
    password: string
    photo_url: string
  }) => void
  initialData: {
    name: string
    surname: string
    login: string
    password: string
    photo_url: string
  }
}

const PersonalDataFormWrapper: React.FC<PersonalDataFormWrapperProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  return (
    isOpen && (
      <>
        <PersonalDataForm
          onClose={onClose}
          onSubmit={onSubmit}
          initialData={initialData}
        />
      </>
    )
  )
}

export default PersonalDataFormWrapper
