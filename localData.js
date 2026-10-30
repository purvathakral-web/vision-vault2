// Simple helper functions return local sample data; they do not make network requests.
import { hackathons, teammates, sampleInternships } from './dummyData.js'

export function getHackathons() {
  return hackathons
}

export function getTeammates() {
  return teammates
}

export function getInternships() {
  return sampleInternships
}
