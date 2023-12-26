// Fonction pour récupérer les données de l'utilisateur
const getAccountFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  const storedTech = localStorage.getItem('tech');

  const account = {
    displayName: '',
    email: '',
    photoURL: '',
  };

  if (storedUser && storedTech) {
    // Convertir la chaîne JSON en objet JavaScript
    const userObject = JSON.parse(storedUser);
    const techObject = JSON.parse(storedTech);

    // Utilisez userObject et accédez à ses sous-éléments
    account.displayName = techObject?.name || ''; // Remplacez "name" par le nom réel de votre sous-élément
    account.email = userObject?.email || ''; // Remplacez "email" par le nom réel de votre sous-élément
    account.photoURL = techObject?.photo || ''; // Remplacez "photo" par le nom réel de votre sous-élément
  }

  return account;
};

// Utilisez la fonction pour obtenir l'objet account
const account = getAccountFromLocalStorage();

// Utilisez l'objet account dans votre application
console.log(account.displayName);
console.log(account.email);
console.log(account.photoURL);

// Exportez l'objet account si nécessaire
export { account };
