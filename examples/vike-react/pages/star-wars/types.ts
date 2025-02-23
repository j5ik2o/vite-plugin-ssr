type Movie = {
  id: string
  title: string
  release_date: string
}

type MovieDetails = {
  id: string
  title: string
  release_date: string
  director: string
  producer: string
}

export type { Movie, MovieDetails };