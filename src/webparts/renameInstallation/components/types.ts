type siteInfoType = {
  Id: string
  Title?: string
  ServerRelativeUrl?: string
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
  messages: string[]
  isValid: boolean
  isChanged: boolean
}

type validatedFieldActionType = {
  value?: string
  messages?: string[]
  isValid?: boolean
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
