type siteInfoType = {
  alias: string
  title?: string
  url?: string
  type?: 'modern' | 'classic'
}

type siteStateActionType = {
  data?: siteInfoType
  error?: string | null
  type: string
}

type siteStateType = {
  current: siteInfoType
  sites: siteInfoType[]
  error: string | null
}

type validatedFieldStateType = {
  value: string
  validators: Function[]
  messages: string[]
  isValid: boolean
  isChanged: boolean
}

type validatedFieldActionType = {
  value?: string
  initialState: validatedFieldStateType
  type: string
}

export {
  siteInfoType,
  siteStateActionType,
  siteStateType,
  validatedFieldStateType,
  validatedFieldActionType,
}
