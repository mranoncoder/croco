export interface INFTItem {
  title: string,
  image: string | StaticImageData,
  link?: string
}

export interface IEarnSummaryInfo {
  marketCap: string,
  earned: string,
  stakes: number,
  totalCoins: number,
  userCoins: number
}

export interface ISupplyInfo {
  unw: string,
  max: string,
  total: string,
  circulating: string,
  burned: string,
  marketCap: string
}

export interface IFAQItem {
  question: string,
  description: string
}

export interface IStakableNFTItem {
  id: number,
  image: string | StaticImageData,
  status: 'NOT-STAKED' | 'STAKED',
  earnPerDay: number,
  stakeExpireDate?: string,
  link?: string
}

export interface ISocialItem {
  link: string,
  media: string,
  icon?: string | StaticImageData,
  image?: string | StaticImageData
}

export interface INavItem {
  link: string,
  text: string
}

export interface IEventItem {
  done: string,
  description: string,
  month: string,
  year: string,
}

export interface ITeamMember {
  title: string,
  role: string,
  avatar: string | StaticImageData,
  description: string,
  instagramLink?: string,
  facebookLink?: string,
  twitterLink?: string,
}
