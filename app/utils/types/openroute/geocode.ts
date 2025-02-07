interface Geometry {
	type: "Point"
	coordinates: [number, number]
}

interface Addendum {
	osm: {
		wikidata: string
	}
}

interface Properties {
	id: string
	gid: string
	layer: string
	source: string
	source_id: string
	country_code: string
	name: string
	accuracy: string
	country: string
	country_gid: string
	country_a: string
	region: string
	region_gid: string
	region_a: string
	county: string
	county_gid: string
	county_a: string
	locality: string
	locality_gid: string
	continent: string
	continent_gid: string
	label: string
	addendum?: Addendum
}

interface Feature {
	type: "Feature"
	geometry: Geometry
	properties: Properties
	bbox: [number, number, number, number]
}

export interface GetAutocompleteResponse {
	features: Feature[]
}
