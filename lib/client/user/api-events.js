const createEvents = async (event) => {
    try {
        console.log("working")
        let response = await fetch('/api/events/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const listEvents = async (signal) => {
    try {
      let response = await fetch('/api/events/', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  const readEvents = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/events/' + params.eventId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const updateEvents = async (params, credentials, event) => {
    try {
      let response = await fetch('/api/events/' + params.eventId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(event)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const removeEvents = async (params, credentials) => {
    try {
      let response = await fetch('/api/events/' + params.eventId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  

  export {
    createEvents,
    listEvents,
    readEvents,
    updateEvents,
    removeEvents
  }