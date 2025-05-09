const Process = () => {
  const questions = [
    { 
      id: 1, 
      question: "How it will predict?", 
      answer: [
        "Predict leverages Logistic Regression to analyze patient data and estimate breast cancer survival rates over time.",
        "This supervised machine learning algorithm is well-suited for binary classification tasks  making it particularly effective for predicting cancer outcomes",  
      ]
    },
    { 
      id: 2, 
      question: "What is the procedure of prediction?", 
      answer: [
       "The algorithm evaluates a comprehensive set of features extracted from a patient’s diagnostic data to make accurate predictions.",
       "These features include Tumor Size and Shape Quantitative measurements such as Radius Average distance from the tumor’s center to its perimeter.",
      "Perimeter and Area the total length and space occupied by the tumor, respectively.",
      "Larger and more irregular tumors are often associated with higher malignancy risk.",
      "Texture: Standard deviation of gray-scale values in the cell images, indicating how rough or grainy the tissue appears.",
      "Smoothness: Measures variations along the edges of the tumor.",
      "Less smooth tumors may indicate abnormal cell behavior.",
    " These metrics help assess tissue uniformity, which is often disrupted in cancerous growths.",
     "Compactness, Concavity, and Symmetry: Compactness Calculated as (perimeter² / area - 1), indicating how tightly packed the tumor cells are.",
      "Concavity: Describes the degree of inward curves or irregularities in the tumor boundary.",
      "Symmetry: Measures how evenly the tumor is shaped; asymmetry is often a sign of malignancy.",
      "These features reveal structural abnormalities commonly seen in aggressive tumors.",
      "Lymph Node Involvement: Indicates whether cancer cells have spread to nearby lymph nodes—a critical factor in staging breast cancer and determining prognosis.",
      "Lymph node metastasis often suggests more advanced disease.",
      "Hormone Receptor Status: Refers to the presence or absence of specific proteins on the tumor cells:",
      "ER (Estrogen Receptor): If present, the tumor may respond to hormone therapy that blocks estrogen.",
      "HER2 (Human Epidermal Growth Factor Receptor 2): Overexpression is associated with more aggressive cancer but also allows targeted treatment with HER2 inhibitors.",
      "These biological markers are crucial for personalizing treatment plans.",
      "By processing these variables, the logistic regression model calculates the probability of survival, using patterns it has learned from thousands of previously recorded cases.",
      "This allows clinicians to support decision-making with data-driven insights."
      ] 
      },
    {
     id:3,
     question:"why logistic regression?",
      answer:[
        "Logistic regression is a statistical method used for binary classification tasks, making it particularly effective for predicting outcomes with two possible categories, such as survival vs. non-survival.",
        "It estimates the probability of an event occurring based on one or more predictor variables, allowing for a clear interpretation of how each variable influences the outcome.",
        "In the context of breast cancer prediction, logistic regression is well-suited for analyzing complex relationships between various clinical and pathological features and the likelihood of survival.",
        "Its ability to provide probabilistic outputs makes it a valuable tool for clinicians in assessing patient risk and tailoring treatment plans accordingly."
      ]
    }]
       return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white"> HOW IT WORKS</h2>
      <div >
        {questions.map(({ id, question, answer }) => (
          <div key={id} className="border-green-400 py-4 px-4 mb-4 rounded-lg bg-gray-800 border-l">
            <h3 className="font-semibold text-lg text-start text-red-300">{question}</h3>
            <ul className="list-disc text-start  text-gray-400 mt-1">
              {answer.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
