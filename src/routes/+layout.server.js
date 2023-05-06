export const load = async ({ locals }) =>{
  //console.log('Layout Load')
  if (locals.user){
    return {
      user: locals.user,
    }
  }

  return {
    user: undefined
  }
}