export type Project = {
  name: string
  /**
   * @description who is the project's owner?
   */
  owner: string
  url: string
  screenshot_url: string
  screenshot_alt: string
  /**
   * @description a description of 
   * - what the project is
   * - what is/was your involvement level?
   */
  description: string
  /**
   * @description the url slug to the project's page in lower case kebab-case
   * @example "url-slug-in-kebab-case"
   */
  slug: string
  activity_periods: ActivityPeriod[]
  /**
   * @description if you joined the project while it had already started, when did you join?
   */
  join_time: string
  technologies: Technology[]
  /**
   * @description if the project was made for a company, which company?
   */
  company_name?: string | undefined
}

export type ActivityPeriod = {
  /**
   * @description year-month-day
   * @example 2023-05-01
   */
  start_time: string
  /**
   * @description year-month-day
   * @example 2023-05-01
   */
  end_time?: string | undefined
}

export type Technology = {
  type: 'frontend' | 'backend' | 'db' | 'api' | 'service'
  name: string
  /**
   * @description a link to the technology's home page
   */
  url?: string
}

export type Projects = Project[]