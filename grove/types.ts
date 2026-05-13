export interface MenuItem {
  label: string;
  path: string;
  visible?: boolean;
  children?: MenuItem[];
}

export interface Menu {
  title: string;
  base: string;
  home?: string;
  description?: string;
  image?: string;
  twitter?: string;
  noindex?: boolean;
  items: MenuItem[];
}

export interface PageSeo {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
}

export interface Page {
  slug: string;
  title: string;
  content: string;
  description?: string;
  date?: string;
  template?: string;
  seo?: PageSeo;
  published: boolean;
  unlisted?: boolean;
  aliases?: string[];
  tags?: string[];
  listing?: boolean;
  listingPageSize?: number;
  raw: string;
}
