/** @type {import('./$types').PageLoad} */
export async function load({locals}) {
  if (!locals.user) return { user: undefined }
  
  return {user: locals.user}
}