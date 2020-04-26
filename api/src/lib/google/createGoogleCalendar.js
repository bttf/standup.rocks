import { google } from 'googleapis';

export default async ({ name, googleAuth }) => {
  const calendarAPI = google.calendar({ version: 'v3', auth: googleAuth });

  let response;

  try {
    response = await calendarAPI.calendars.insert({
      requestBody: { summary: name },
    });
  } catch (e) {
    throw e;
  }

  return response.data;
};
