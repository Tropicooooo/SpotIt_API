export async function reverseGeocode(latitude, longitude) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Géocodage inversé échoué :', error);
      return null;
    }
}


export async function geocodeAddress(address) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(address)}`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.length === 0) {
        throw new Error('Aucune correspondance trouvée pour l\'adresse');
      }
  
      const { lat, lon } = data[0]; // Récupère la première correspondance
      return { latitude: lat, longitude: lon };
    } catch (error) {
      console.error('Géocodage échoué :', error);
      return null;
    }
  }
  