export interface PostResponse {
	routes: Route[]
	error?: {
		code: number
		message: string
	}
}

interface Route {
	summary: Summary
}

interface Summary {
	distance: number
	duration: number
	ascent: number
	descent: number
	fare: number
}
