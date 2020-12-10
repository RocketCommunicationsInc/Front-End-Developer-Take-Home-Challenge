export class Alert {
  errorId: string
  errorSeverity: string
  errorCategory: string
  errorMessage: number
  longMessage: string
  errorTime: number
  selected: boolean
  new: boolean
  expanded: boolean

  constructor(
    errorId: string,
    errorSeverity: string,
    errorCategory: string,
    errorMessage: number,
    longMessage: string,
    errorTime: number,
    selected: boolean,
    _new: boolean,
    expanded: boolean,
  ) {
    this.errorId = errorId
    this.errorSeverity = errorSeverity
    this.errorCategory = errorCategory
    this.errorMessage = errorMessage
    this.longMessage = longMessage
    this.errorTime = errorTime
    this.selected = selected
    this.new = _new
    this.expanded = expanded
  }
}
