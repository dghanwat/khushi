export class EventDisplayModel {
  locationId: string;
  locationName: string;
  locationEvent: LocationEvent[];
  organisationId: string;
}

export class LocationEvent {
  severity: number;
  description: string;
  eventType: string;
}
