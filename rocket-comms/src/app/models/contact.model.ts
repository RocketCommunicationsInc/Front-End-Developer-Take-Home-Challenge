/**
 * An interface for Contact data.
 */
export interface Contact {
  id: string; // Internal ID.
  contactId: string;
  status: string;
  name: string;
  iron: string; // Contact (Satellite Name).
  groundStation: string;
  state: string;
}
