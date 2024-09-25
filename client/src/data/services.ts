import { TRating } from "../types";

// Import photos
import logo1 from "../assets/sample_images/logo-company.png";
import logo2 from "../assets/sample_images/log-company-1.png";

interface ServiceTier {
  tier: "basic" | "standard" | "elite" | "premium";
  price: number;
  features: string[];
  deliveryTimeInDays: number;
}

export interface IService {
  id: number;
  userId: number;
  title: string;
  description: string;
  images: string[];
  tiers: ServiceTier[];
  ratings: TRating[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const services: IService[] = [
  {
    id: 1,
    userId: 2,
    title: "Logo Design",
    description: "I will design a logo for your business.",
    images: [logo1, "https://via.placeholder.com/400x225", "https://via.placeholder.com/800x450", "https://via.placeholder.com/1920x1080"],
    ratings: [
      {
        id: 1,
        rating: 5,
        comment: "This is a great logo!",
        userId: 1,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 2,
        rating: 4,
        comment: "This is a great logo!",
        userId: 1,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
    ],
    faqs: [
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
    ],

    tiers: [
      {
        tier: "basic",
        price: 5,
        features: ["1 logo design", "1 revision"],
        deliveryTimeInDays: 1,
      },
      {
        tier: "standard",
        price: 10,
        features: ["2 logo designs", "2 revisions"],
        deliveryTimeInDays: 2,
      },
      {
        tier: "elite",
        price: 15,
        features: ["3 logo designs", "3 revisions"],
        deliveryTimeInDays: 3,
      },
      {
        tier: "premium",
        price: 20,
        features: ["4 logo designs", "4 revisions"],
        deliveryTimeInDays: 4,
      },
    ],
  },

  {
    id: 2,
    userId: 1,
    title: "Logo Design",
    description: "I will design a logo for your business.",
    images: [logo2, "https://via.placeholder.com/300x300", "https://via.placeholder.com/300x300", "https://via.placeholder.com/300x300"],
    ratings: [
      {
        id: 1,
        rating: 5,
        comment: "This is a great logo!",
        userId: 1,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
    ],
    faqs: [
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
    ],

    tiers: [
      {
        tier: "basic",
        price: 5,
        features: ["1 logo design", "1 revision"],
        deliveryTimeInDays: 1,
      },
      {
        tier: "standard",
        price: 10,
        features: ["2 logo designs", "2 revisions"],
        deliveryTimeInDays: 2,
      },
      {
        tier: "elite",
        price: 15,
        features: ["3 logo designs", "3 revisions"],
        deliveryTimeInDays: 3,
      },
      {
        tier: "premium",
        price: 20,
        features: ["4 logo designs", "4 revisions"],
        deliveryTimeInDays: 4,
      },
    ],
  },

  {
    id: 3,
    userId: 3,
    title: "Logo Design",
    description: "I will design a logo for your business.",
    images: [
      "https://cdn.pixabay.com/photo/2016/03/26/13/09/cup-of-coffee-1280537_640.jpg",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
    ],
    ratings: [
      {
        id: 1,
        rating: 5,
        comment: "This is a great logo!",
        userId: 1,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
    ],
    faqs: [
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
    ],

    tiers: [
      {
        tier: "basic",
        price: 5,
        features: ["1 logo design", "1 revision"],
        deliveryTimeInDays: 1,
      },
      {
        tier: "standard",
        price: 10,
        features: ["2 logo designs", "2 revisions"],
        deliveryTimeInDays: 2,
      },
      {
        tier: "elite",
        price: 15,
        features: ["3 logo designs", "3 revisions"],
        deliveryTimeInDays: 3,
      },
      {
        tier: "premium",
        price: 20,
        features: ["4 logo designs", "4 revisions"],
        deliveryTimeInDays: 4,
      },
    ],
  },

  {
    id: 4,
    userId: 4,
    title: "Logo Design",
    description: "I will design a logo for your business.",
    images: [
      "https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_640.jpg",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
    ],
    ratings: [
      {
        id: 1,
        rating: 5,
        comment: "This is a great logo!",
        userId: 2,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 2,
        rating: 5,
        comment: "This is a great logo!",
        userId: 1,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 3,
        rating: 4,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
    ],
    faqs: [
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
    ],

    tiers: [
      {
        tier: "basic",
        price: 5,
        features: ["1 logo design", "1 revision"],
        deliveryTimeInDays: 1,
      },
      {
        tier: "standard",
        price: 10,
        features: ["2 logo designs", "2 revisions"],
        deliveryTimeInDays: 2,
      },
      {
        tier: "elite",
        price: 15,
        features: ["3 logo designs", "3 revisions"],
        deliveryTimeInDays: 3,
      },
      {
        tier: "premium",
        price: 20,
        features: ["4 logo designs", "4 revisions"],
        deliveryTimeInDays: 4,
      },
    ],
  },

  {
    id: 5,
    userId: 5,
    title: "Logo Design",
    description: "I will design a logo for your business.",
    images: [
      "https://cdn.pixabay.com/photo/2015/01/14/18/41/home-office-599475_640.jpg",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
    ],
    ratings: [
      {
        id: 1,
        rating: 5,
        comment: "This is a great logo!",
        userId: 2,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 2,
        rating: 5,
        comment: "This is a great logo!",
        userId: 1,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 3,
        rating: 4,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 4,
        rating: 4,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 5,
        rating: 5,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 6,
        rating: 5,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
    ],
    faqs: [
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
    ],

    tiers: [
      {
        tier: "basic",
        price: 5,
        features: ["1 logo design", "1 revision"],
        deliveryTimeInDays: 1,
      },
      {
        tier: "standard",
        price: 10,
        features: ["2 logo designs", "2 revisions"],
        deliveryTimeInDays: 2,
      },
      {
        tier: "elite",
        price: 15,
        features: ["3 logo designs", "3 revisions"],
        deliveryTimeInDays: 3,
      },
      {
        tier: "premium",
        price: 20,
        features: ["4 logo designs", "4 revisions"],
        deliveryTimeInDays: 4,
      },
    ],
  },

  {
    id: 6,
    userId: 6,
    title: "Logo Design",
    description: "I will design a logo for your business.",
    images: [
      "https://cdn.pixabay.com/photo/2016/06/15/16/00/woman-1459220_640.png",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/300x300",
    ],
    ratings: [
      {
        id: 1,
        rating: 5,
        comment: "This is a great logo!",
        userId: 2,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 2,
        rating: 5,
        comment: "This is a great logo!",
        userId: 1,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 3,
        rating: 5,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 4,
        rating: 4,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 5,
        rating: 5,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
      {
        id: 6,
        rating: 5,
        comment: "This is a great logo!",
        userId: 4,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
    ],
    faqs: [
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
      {
        question: "What is a logo?",
        answer: "A logo is a symbol that represents a business.",
      },
    ],

    tiers: [
      {
        tier: "basic",
        price: 5,
        features: ["1 logo design", "1 revision"],
        deliveryTimeInDays: 1,
      },
      {
        tier: "standard",
        price: 10,
        features: ["2 logo designs", "2 revisions"],
        deliveryTimeInDays: 2,
      },
      {
        tier: "elite",
        price: 15,
        features: ["3 logo designs", "3 revisions"],
        deliveryTimeInDays: 3,
      },
      {
        tier: "premium",
        price: 20,
        features: ["4 logo designs", "4 revisions"],
        deliveryTimeInDays: 4,
      },
    ],
  },
];
