async function getImages() {
  return [
    'https://firebasestorage.googleapis.com/v0/b/dentai-9ba0d.appspot.com/o/teeth%2Ffront_tooth_cavity_bbbc442e92.jpg?alt=media&token=28d30b42-4f45-4430-9689-f898e8dcb4dd',
    'https://firebasestorage.googleapis.com/v0/b/dentai-9ba0d.appspot.com/o/teeth%2F3Dental-pic1.png?alt=media&token=a00eeecc-0413-40f9-8654-96e91810dff5',
  ];
}

async function analyzeImages() {
  return 'На цьому зображенні ви бачите зуби людини. Зображення зосереджується на верхній частині зубів і показує деякі зуби в передній частині рота. На одному з передніх зубів є помітний темний нальоток або пляма, на який вказує велика червона стрілка.';
}

export default {
  getImages,
  analyzeImages,
};
