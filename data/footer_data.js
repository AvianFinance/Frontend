const footerMenuList =
[
  {
    id: 1,
    title: "Marketplace",
    diffClass: "md:col-start-7",
    list: [
      {
        id: 1,
        href: "http://localhost:3000/collection/explore_collection",
        text: "All NFTs",
      },
      {
        id: 2,
        href: "http://localhost:3000/create",
        text: "Mint NFTs",
      }
    ],
  },
  {
    id: 2,
    title: "Company",
    diffClass: "",
    list: [
      {
        id: 2,
        href: "http://localhost:3000/blog",
        text: "Our Blog",
      },
      {
        id: 2,
        href: "http://localhost:3000/help_center",
        text: "Help Center",
      },
    ],
  },
  {
    id: 3,
    title: "My Account",
    diffClass: "",
    list: [
      {
        id: 1,
        href: "http://localhost:3000/user/",
        text: "Author Profile",
      },
      {
        id: 2,
        href: "http://localhost:3000/profile/user_avatar",
        text: "Edit Profile",
      }
    ],
  },
];

const socialIcons = [
  {
    id: 1,
    href: "https://www.facebook.com",
    text: "facebook",
  },
  {
    id: 2,
    href: "https://www.twitter.com",
    text: "twitter",
  },
  {
    id: 3,
    href: "https://www.discord.com",
    text: "discord",
  },
  {
    id: 4,
    href: "https://www.instagram.com",
    text: "instagram",
  },
  {
    id: 5,
    href: "https://www.tiktok.com",
    text: "tiktok",
  },
];

export { footerMenuList, socialIcons };
