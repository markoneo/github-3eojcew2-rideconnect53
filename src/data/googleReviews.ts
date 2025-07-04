import { GoogleReview } from '../types/reviews';

// These are sample reviews based on the Google link
// In a production app, you would fetch these from Google API
export const googleReviews: GoogleReview[] = [
  {
    id: 'review1',
    reviewer: {
      name: 'Tomaz Kriz',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjW_4TLU2o_Bao9SzZs1pZO6zcbnE-JeIQkK_iqUxcT9=w36-h36-p-rp-mo-ba3-br100'
    },
    rating: 5,
    text: 'Great service! The driver arrived on time and was very professional. The car was clean and comfortable. I would definitely use this service again.',
    date: '2023-08-15',
    isVerified: true
  },
  {
    id: 'review2',
    reviewer: {
      name: 'Susanne Maier',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjVhEYj7JKNw_pDqK4bBXPXwLwOXTsOz3JGgK1OgJTpIZg=w36-h36-p-rp-mo-br100'
    },
    rating: 5,
    text: 'Excellent transfer service from Venice Airport to Trieste. Our driver was punctual, friendly and drove safely. The vehicle was clean and comfortable. Great value for money.',
    date: '2023-09-22',
    isVerified: true
  },
  {
    id: 'review3',
    reviewer: {
      name: 'Michael Johnson',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjUGRfm93ht-VN62qjQ3Jj0qwEcNG24M33TFtTZrHlahbg=w36-h36-p-rp-mo-ba4-br100'
    },
    rating: 5,
    text: 'We used RideConnect for a transfer from Ljubljana to Venice. The driver was waiting for us at the hotel, helped with the luggage, and got us to Venice in good time. Perfect experience!',
    date: '2023-07-18',
    isVerified: true
  },
  {
    id: 'review4',
    reviewer: {
      name: 'Laura Wilson',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjV1YjxYwmaFkMoXwzxH_nV2N6HUWB_TzwD-VH81h8QCxQ=w36-h36-p-rp-mo-br100'
    },
    rating: 5,
    text: 'Our cruise ship arrived late at Trieste port, but our driver waited patiently. He was polite and drove us safely to Venice Airport. Highly recommended service!',
    date: '2023-10-05',
    isVerified: true
  },
  {
    id: 'review5',
    reviewer: {
      name: 'David Miller',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjWBCw_fF6LGGVhpFQPqoF1oXxJJBU50-IZzHyGNTCyxkg=w36-h36-p-rp-mo-ba3-br100'
    },
    rating: 4,
    text: 'Very good service. We booked a transfer from Trieste to Ljubljana. The booking process was easy and the driver arrived on time. The only reason for 4 stars instead of 5 is that the AC could have been stronger on a hot day.',
    date: '2023-08-30',
    isVerified: true
  },
  {
    id: 'review6',
    reviewer: {
      name: 'Emma Thompson',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjXm850FsRzU00DoEfZbDghSJ4OhI_6NajD4g3TZPTU9=w36-h36-p-rp-mo-br100'
    },
    rating: 5,
    text: 'Exceptional service! We had an early morning transfer from our hotel to Venice airport. The driver arrived 10 minutes early and was extremely courteous. The vehicle was immaculate and the journey was smooth.',
    date: '2023-09-12',
    isVerified: true
  },
  {
    id: 'review7',
    reviewer: {
      name: 'Robert Garcia',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjViPTgwJUTBfPxE5U5Mda2v_KQu_UiUhCCfRLTk5NyCsw=w36-h36-p-rp-mo-ba2-br100'
    },
    rating: 5,
    text: 'Used RideConnect for an airport transfer in Croatia. The online booking was straightforward, confirmation was immediate, and the service was flawless. The driver was professional and spoke good English.',
    date: '2023-10-20',
    isVerified: true
  },
  {
    id: 'review8',
    reviewer: {
      name: 'Sophie Anderson',
      photoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjXaNE95JJ0BBYEaWqXwUBSAIe6icjlxHIa9wPgE7ixnKg=w36-h36-p-rp-mo-br100'
    },
    rating: 5,
    text: 'Fantastic experience with RideConnect! We needed a last-minute transfer from Trieste to Ljubljana airport and they arranged it perfectly. The driver was friendly and knowledgeable about the area, sharing interesting facts during our journey.',
    date: '2023-08-05',
    isVerified: true
  }
];

// Filter function to get only verified reviews with 4+ stars
export const getTopRatedReviews = (): GoogleReview[] => {
  return googleReviews.filter(review => review.isVerified && review.rating >= 4);
};