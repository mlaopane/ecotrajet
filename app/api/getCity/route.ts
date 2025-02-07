import type { Geocode } from "@/app/utils/types/openroute"
import { NextRequest, NextResponse } from "next/server"

type City = {
	name: string
	coordinates: [number, number]
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const city = searchParams.get("city")

	if (!city) {
		return NextResponse.json(
			{ error: "Query parameter 'city' is required" },
			{ status: 400 },
		)
	}

	const apiKey = process.env.ORS_API_KEY
	if (!apiKey) {
		return NextResponse.json({ error: "API key is missing" }, { status: 500 })
	}

	//pour cibler le point de recherche si besoin
	// const focusPoint =
	// 	lat && lon && `&focus.point.lat=${lat}&focus.point.lon=${lon}`

	const endpoint = "https://api.openrouteservice.org/geocode/autocomplete"
	const url = `${endpoint}?api_key=${apiKey}&layers=locality&text=${city}&size=5`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error("Failed to fetch city data")
		}

		const data: Geocode.GetAutocompleteResponse = await response.json()

		const cities: City[] = data.features.map((feature) => ({
			name: feature.properties.label,
			coordinates: feature.geometry.coordinates,
		}))

		return NextResponse.json(cities)
	} catch (error) {
		console.error("Error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
