const ResponseStep = () => {
  const text =
    "На цьому зображенні ви бачите зуби людини. " +
    "Зображення зосереджується на верхній частині зубів і показує деякі зуби в передній частині рота. " +
    "На одному з передніх зубів є помітний темний нальоток або пляма, на який вказує велика червона стрілка.";

  return (
    <div
      className={
        "flex w-full min-h-96 border border-gray-200 rounded-b-lg p-4 text-black"
      }
    >
      {text}
    </div>
  );
};

export default ResponseStep;
