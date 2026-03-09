import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MedicalFormFirst = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { preferredLanguage, idNumber, diagnosis } = location.state || {};

  const [formData, setFormData] = useState({
    idNumber: idNumber,
    preferredLanguage: preferredLanguage,
    diagnosis: diagnosis || [],
    // Crohn's specific fields
    medicalDiagnosis: '',
    crohnAge: '',
    diagnosisAge: '',
    diagnosisMethod: '',
    isTreating: '',
    treatmentDetails: '',
    treatmentDuration: '',
    treatmentChanges: '',
    treatmentAdherence: '',
    doctorVisits: '',
    otherChronicDiseases: '',
    otherChronicSymptomsAge: '',
    otherChronicDiagnosisAge: '',
    aggravatingFactors: '',
    alleviatingFactors: '',
    triggerEvent: '',
    triggerEventDetails: '',
    causeOpinion: '',
    bestTreatment: '',
    prevention: '',
    preventionDetails: '',
    otherMedicalFollowup: '',
    impactOnLife: [],
    psychologicalTreatment: '',
    emotionalConnection: '',
    stoolRemission: '',
    stoolAttack: '',
    additionalInfoIBD: '',
    dietChange: '',
    dietChangeDetails: '',
    remissionExperience: '',
    preSymptoms: [],
    additionalInfoGeneral: '',
    // Psoriasis specific fields
    medicalDiagnosisPsoriasis: '',
    psoriasisAge: '',
    psoriasisDiagnosisAge: '',
    biopsyDiagnosis: '',
    isTreatingPsoriasis: '',
    treatmentDetailsPsoriasis: '',
    treatmentDurationPsoriasis: '',
    treatmentChangesPsoriasis: '',
    treatmentAdherencePsoriasis: '',
    doctorVisitsPsoriasis: '',
    seasonalWorsening: '',
    otherChronicDiseasesPsoriasis: '',
    otherChronicSymptomsAgePsoriasis: '',
    otherChronicDiagnosisAgePsoriasis: '',
    aggravatingFactorsPsoriasis: '',
    alleviatingFactorsPsoriasis: '',
    triggerEventPsoriasis: '',
    triggerEventDetailsPsoriasis: '',
    causeOpinionPsoriasis: '',
    bestTreatmentPsoriasis: '',
    preventionPsoriasis: '',
    preventionDetailsPsoriasis: '',
    otherMedicalFollowupPsoriasis: '',
    publicExposureAvoidance: '',
    familyHistoryPsoriasis: '',
    familyHistoryRelationPsoriasis: [],
    impactOnLifePsoriasis: [],
    psychologicalTreatmentPsoriasis: '',
    emotionalConnectionPsoriasis: '',
    additionalInfoPsoriasis: '',
    dietChangePsoriasis: '',
    dietChangeDetailsPsoriasis: '',
    remissionExperiencePsoriasis: '',
    preSymptomsPsoriasis: [],
    additionalInfoGeneralPsoriasis: '',
    // RA specific fields
    medicalDiagnosisRA: '',
    raAge: '',
    raDiagnosisAge: '',
    isTreatingRA: '',
    treatmentDetailsRA: '',
    treatmentDurationRA: '',
    treatmentChangesRA: '',
    treatmentAdherenceRA: '',
    involvedJoints: '',
    seasonalWorseningRA: '',
    doctorVisitsRA: '',
    physiotherapyRA: '',
    otherChronicDiseasesRA: '',
    otherChronicSymptomsAgeRA: '',
    otherChronicDiagnosisAgeRA: '',
    complementaryMedicineRA: '',
    complementaryMedicineReasonRA: '',
    complementaryMedicineDetailsRA: '',
    aggravatingFactorsRA: '',
    alleviatingFactorsRA: '',
    triggerEventRA: '',
    triggerEventDetailsRA: '',
    causeOpinionRA: '',
    bestTreatmentRA: '',
    preventionRA: '',
    preventionDetailsRA: '',
    otherMedicalFollowupRA: '',
    familyHistoryRA: '',
    familyHistoryRelationRA: [],
    impactOnLifeRA: [],
    psychologicalTreatmentRA: '',
    emotionalConnectionRA: '',
    additionalInfoRA: '',
    dietChangeRA: '',
    dietChangeDetailsRA: '',
    remissionExperienceRA: '',
    preSymptomsRA: [],
    additionalInfoGeneralRA: '',
    // PSA specific fields
    medicalDiagnosisPSA: '',
    psaAge: '',
    psaDiagnosisAge: '',
    alsoPsoriasis: '',
    isTreatingPSA: '',
    treatmentDetailsPSA: '',
    treatmentDurationPSA: '',
    treatmentChangesPSA: '',
    treatmentAdherencePSA: '',
    involvedJointsPSA: '',
    seasonalWorseningPSA: '',
    doctorVisitsPSA: '',
    physiotherapyPSA: '',
    otherChronicDiseasesPSA: '',
    otherChronicSymptomsAgePSA: '',
    otherChronicDiagnosisAgePSA: '',
    complementaryMedicinePSA: '',
    complementaryMedicineReasonPSA: '',
    complementaryMedicineDetailsPSA: '',
    aggravatingFactorsPSA: '',
    alleviatingFactorsPSA: '',
    triggerEventPSA: '',
    triggerEventDetailsPSA: '',
    causeOpinionPSA: '',
    bestTreatmentPSA: '',
    preventionPSA: '',
    preventionDetailsPSA: '',
    familyHistoryPSA: '',
    familyHistoryRelationPSA: [],
    otherMedicalFollowupPSA: '',
    impactOnLifePSA: [],
    psychologicalTreatmentPSA: '',
    emotionalConnectionPSA: '',
    additionalInfoPSA: '',
    dietChangePSA: '',
    dietChangeDetailsPSA: '',
    remissionExperiencePSA: '',
    preSymptomsPSA: [],
    additionalInfoGeneralPSA: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    let updatedList = [...(formData[name] || [])];
    if (checked) {
      updatedList.push(value);
    } else {
      updatedList = updatedList.filter(item => item !== value);
    }
    setFormData({ ...formData, [name]: updatedList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
         await axios.post("http://54.242.154.185:3002/submit_medical_first", formData);
         navigate("/PTSDQuestionnaire", { state: { preferredLanguage, idNumber } }); 
    } catch (error) {
        console.error("Error submitting form", error);
    }
  };

  const isCrohn = Array.isArray(formData.diagnosis) && formData.diagnosis.some(d => d.includes("קרוהן") || d.includes("קוליטיס"));
  const isPsoriasis = Array.isArray(formData.diagnosis) && formData.diagnosis.some(d => d.includes("פסוריאזיס"));
  const isRA = Array.isArray(formData.diagnosis) && formData.diagnosis.some(d => d.includes("ראומטיק ארטריטיס"));
  const isPSA = Array.isArray(formData.diagnosis) && formData.diagnosis.some(d => d.includes("פסוריאטיק ארטריטס"));

  return (
    <div className="form-container" dir="rtl">
      <h2 className="text-center mb-4">שאלון רפואי</h2>
      <form onSubmit={handleSubmit}>
        {isCrohn && (
          <div className="crohn-section">
            <h4 className="text-primary mb-3">שאלות עבור קרוהן/קוליטיס</h4>

            <div className="form-group mb-3">
              <label className="form-label">מהי האבחנה הרפואית של מחלתך?</label>
              <input type="text" className="form-control" name="medicalDiagnosis" value={formData.medicalDiagnosis} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל פריצת הקרוהן/ קוליטיס</label>
              <input type="number" className="form-control" name="crohnAge" value={formData.crohnAge} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל אבחון הקרוהן/קוליטיס</label>
              <input type="number" className="form-control" name="diagnosisAge" value={formData.diagnosisAge} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">באיזו שיטה בוצעה האבחנה?</label>
              {["קלינית", "מדדי דלקת", "אנדוסקופיה", "ביופסיה"].map(opt => (
                <div className="form-check" key={opt}>
                  <input type="radio" name="diagnosisMethod" value={opt} onChange={handleChange} checked={formData.diagnosisMethod === opt} /> {opt}
                </div>
              ))}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם כרגע אתה מקבל טיפול כנגד המחלה?</label>
              <div className="form-check">
                <input type="radio" name="isTreating" value="כן" onChange={handleChange} checked={formData.isTreating === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="isTreating" value="לא" onChange={handleChange} checked={formData.isTreating === "לא"} /> לא
              </div>
            </div>

            {formData.isTreating === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן איזה טיפול?</label>
                  <input type="text" className="form-control" name="treatmentDetails" value={formData.treatmentDetails} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">כמה זמן אתה מטופל בטיפול זה?</label>
                  <input type="text" className="form-control" name="treatmentDuration" value={formData.treatmentDuration} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">האם היו שינויים בטיפול/ במינון , אם כן מתי ומדוע?</label>
                  <textarea className="form-control" name="treatmentChanges" value={formData.treatmentChanges} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה מתמיד בטיפול?</label>
              {["כן 100% מתמיד", "80% מתמיד", "50% מתמיד", "לא מתמיד"].map(opt => (
                <div className="form-check" key={opt}>
                  <input type="radio" name="treatmentAdherence" value={opt} onChange={handleChange} checked={formData.treatmentAdherence === opt} /> {opt}
                </div>
              ))}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">כמה פעמים בשנה אתה מבקר רופא בעקבות הקרוהן</label>
              <input type="number" className="form-control" name="doctorVisits" value={formData.doctorVisits} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש לך מחלות כרוניות נוספות</label>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseases" value="כן" onChange={handleChange} checked={formData.otherChronicDiseases === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseases" value="לא" onChange={handleChange} checked={formData.otherChronicDiseases === "לא"} /> לא
              </div>
            </div>

            {formData.otherChronicDiseases === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל החלו התסמינים?</label>
                  <input type="number" className="form-control" name="otherChronicSymptomsAge" value={formData.otherChronicSymptomsAge} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל אובחנו</label>
                  <input type="number" className="form-control" name="otherChronicDiagnosisAge" value={formData.otherChronicDiagnosisAge} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להחמרה במצב הקרוהן/ קוליטיס?</label>
              <textarea className="form-control" name="aggravatingFactors" value={formData.aggravatingFactors} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להטבה במצב הקרוהן/ קוליטיס?</label>
              <textarea className="form-control" name="alleviatingFactors" value={formData.alleviatingFactors} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם התפרצות המחלה התרחשה בסמיכות להתפרצות מחלה אחרת/ בסמיכות לארוע משנה חיים/תאונה/ טראומה?</label>
              <div className="form-check">
                <input type="radio" name="triggerEvent" value="כן" onChange={handleChange} checked={formData.triggerEvent === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="triggerEvent" value="לא" onChange={handleChange} checked={formData.triggerEvent === "לא"} /> לא
              </div>
              {formData.triggerEvent === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט.י</label>
                    <textarea className="form-control" name="triggerEventDetails" value={formData.triggerEventDetails} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם לדעתך יש משהו שגרם/ תרם להתפרצות המחלה שלך?</label>
              <textarea className="form-control" name="causeOpinion" value={formData.causeOpinion} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">מה הטיפול שעזר/ עוזר לך ביותר - פרט.י</label>
              <textarea className="form-control" name="bestTreatment" value={formData.bestTreatment} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש משהו שהמחלת קרוהן מונעת ממך לעשות?</label>
              <div className="form-check">
                <input type="radio" name="prevention" value="כן" onChange={handleChange} checked={formData.prevention === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="prevention" value="לא" onChange={handleChange} checked={formData.prevention === "לא"} /> לא
              </div>
              {formData.prevention === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם ענית כן אנא פרט.י</label>
                    <textarea className="form-control" name="preventionDetails" value={formData.preventionDetails} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה נצא במעקב רפואי אחר מחלה אחרת פרט לקרוהן/ קוליטיס?</label>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowup" value="כן" onChange={handleChange} checked={formData.otherMedicalFollowup === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowup" value="לא" onChange={handleChange} checked={formData.otherMedicalFollowup === "לא"} /> לא
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם המחלה השפיעה על הדברים הבאים?</label>
              {["בטחון עצמי", "חיי חברה", "מצב רוח", "תעסוקה", "זוגיות", "יחס להורים", "פעילות גופנית", "הערכה עצמית"].map(item => (
                <div className="form-check" key={item}>
                  <input type="checkbox" name="impactOnLife" value={item} onChange={handleCheckboxChange} checked={formData.impactOnLife.includes(item)} />
                  <label className="form-check-label mx-2">{item}</label>
                </div>
              ))}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם עברת בעבר או בהווה טיפול פסיכולוגי?</label>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatment" value="כן" onChange={handleChange} checked={formData.psychologicalTreatment === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatment" value="לא" onChange={handleChange} checked={formData.psychologicalTreatment === "לא"} /> לא
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם ראיתי קשר בין מצב המחלה לבין הטיפול הרגשי?</label>
              <textarea className="form-control" name="emotionalConnection" value={formData.emotionalConnection} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">מתן צואה ברמיסיה - מספר פעמים ביום/ בשבוע</label>
              <input type="text" className="form-control" name="stoolRemission" value={formData.stoolRemission} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">מתן צואה בזמן התקף - מספר פעמים ביום</label>
              <input type="number" className="form-control" name="stoolAttack" value={formData.stoolAttack} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שתרצה שנדע בהקשר למחלת IBD שלך?</label>
              <textarea className="form-control" name="additionalInfoIBD" value={formData.additionalInfoIBD} onChange={handleChange} />
            </div>

            <h4 className="text-primary mt-4 mb-3">שאלון מתוקף תפיסת מחלה (מחלת הקרוהן)</h4>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם ערכת שינוי בדיאטה בעקבות המחלה?</label>
              <div className="form-check">
                <input type="radio" name="dietChange" value="כן" onChange={handleChange} checked={formData.dietChange === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="dietChange" value="לא" onChange={handleChange} checked={formData.dietChange === "לא"} /> לא
              </div>
              {formData.dietChange === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט מה היו השינויים</label>
                    <textarea className="form-control" name="dietChangeDetails" value={formData.dietChangeDetails} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אי פעם חווית הפוגה/ רמיסיה של המחלה</label>
              <div className="form-check">
                <input type="radio" name="remissionExperience" value="כן" onChange={handleChange} checked={formData.remissionExperience === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="remissionExperience" value="לא" onChange={handleChange} checked={formData.remissionExperience === "לא"} /> לא
              </div>
            </div>

            {formData.remissionExperience === "כן" && (
              <div className="form-group mb-3">
                <label className="form-label">אם כן- האם אתה יכול להצביע על סימנים מקדימים המופיעים לפני התפרצות חוזרת של המחלה/ התקף? או סימנים שמעידים עבורך על התפרצות קרבה?</label>
                <div className="row">
                  {[
                    "תחושת חרדה", "שינויים בראיה", "שינויים בחוש הריח", "שינויים במצב הרוח", "חום",
                    "כאבי/ מיחושי ראש", "כאבי/ מיחושי בטן", "כאבי שרירים", "קשיי שינה/ הרדמות",
                    "היפראקטיביות/ פעלתנות אינטנסיבית", "בחילה", "צרבת", "עייפות", "תחושת מועקה",
                    "אחר- פרט.י", "לא יודע.ת"
                  ].map(symptom => (
                    <div className="col-md-6" key={symptom}>
                      <div className="form-check">
                        <input type="checkbox" name="preSymptoms" value={symptom} onChange={handleCheckboxChange} checked={formData.preSymptoms.includes(symptom)} />
                        <label className="form-check-label mx-2">{symptom}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שחשוב שנדע?</label>
              <textarea className="form-control" name="additionalInfoGeneral" value={formData.additionalInfoGeneral} onChange={handleChange} />
            </div>

          </div>
        )}

        {isPsoriasis && (
          <div className="psoriasis-section mt-5 border-top pt-4">
            <h4 className="text-primary mb-3">שאלות עבור פסוריאזיס</h4>

            <div className="form-group mb-3">
              <label className="form-label">מהי האבחנה הרפואית של מחלתך?</label>
              <input type="text" className="form-control" name="medicalDiagnosisPsoriasis" value={formData.medicalDiagnosisPsoriasis} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל פריצת הפסוריאזיס</label>
              <input type="number" className="form-control" name="psoriasisAge" value={formData.psoriasisAge} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל אבחון הפסוריאזיס</label>
              <input type="number" className="form-control" name="psoriasisDiagnosisAge" value={formData.psoriasisDiagnosisAge} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אובחנה ע"י ביופסיה?</label>
              {["כן", "לא", "לא יודע"].map(opt => (
                <div className="form-check" key={opt}>
                  <input type="radio" name="biopsyDiagnosis" value={opt} onChange={handleChange} checked={formData.biopsyDiagnosis === opt} /> {opt}
                </div>
              ))}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם כרגע אתה מקבל טיפול כנגד המחלה?</label>
              <div className="form-check">
                <input type="radio" name="isTreatingPsoriasis" value="כן" onChange={handleChange} checked={formData.isTreatingPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="isTreatingPsoriasis" value="לא" onChange={handleChange} checked={formData.isTreatingPsoriasis === "לא"} /> לא
              </div>
            </div>

            {formData.isTreatingPsoriasis === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן איזה טיפול?</label>
                  <input type="text" className="form-control" name="treatmentDetailsPsoriasis" value={formData.treatmentDetailsPsoriasis} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">כמה זמן אתה מטופל בטיפול זה?</label>
                  <input type="text" className="form-control" name="treatmentDurationPsoriasis" value={formData.treatmentDurationPsoriasis} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">האם היו שינויים בטיפול/ במינון , אם כן מתי ומדוע?</label>
                  <textarea className="form-control" name="treatmentChangesPsoriasis" value={formData.treatmentChangesPsoriasis} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה מתמיד בטיפול?</label>
              {["כן 100% מתמיד", "80% מתמיד", "50% מתמיד", "לא מתמיד"].map(opt => (
                <div className="form-check" key={opt}>
                  <input type="radio" name="treatmentAdherencePsoriasis" value={opt} onChange={handleChange} checked={formData.treatmentAdherencePsoriasis === opt} /> {opt}
                </div>
              ))}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">כמה פעמים בשנה אתה מבקר רופא.ה בעקבות הפסוריאזיס</label>
              <input type="number" className="form-control" name="doctorVisitsPsoriasis" value={formData.doctorVisitsPsoriasis} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך האם יש עונה בה יש החמרה במחלה?</label>
              <input type="text" className="form-control" name="seasonalWorsening" value={formData.seasonalWorsening} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש לך מחלות כרוניות נוספות</label>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseasesPsoriasis" value="כן" onChange={handleChange} checked={formData.otherChronicDiseasesPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseasesPsoriasis" value="לא" onChange={handleChange} checked={formData.otherChronicDiseasesPsoriasis === "לא"} /> לא
              </div>
            </div>

            {formData.otherChronicDiseasesPsoriasis === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל החלו התסמינים?</label>
                  <input type="number" className="form-control" name="otherChronicSymptomsAgePsoriasis" value={formData.otherChronicSymptomsAgePsoriasis} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל אובחנו</label>
                  <input type="number" className="form-control" name="otherChronicDiagnosisAgePsoriasis" value={formData.otherChronicDiagnosisAgePsoriasis} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להחמרה במצב ההפסוריאזיס?</label>
              <textarea className="form-control" name="aggravatingFactorsPsoriasis" value={formData.aggravatingFactorsPsoriasis} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להטבה במצב הפסוריאזיס?</label>
              <textarea className="form-control" name="alleviatingFactorsPsoriasis" value={formData.alleviatingFactorsPsoriasis} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם התפרצות המחלה התרחשה בסמיכות להתפרצות מחלה אחרת/ בסמיכות לארוע משנה חיים/תאונה/ טראומה?</label>
              <div className="form-check">
                <input type="radio" name="triggerEventPsoriasis" value="כן" onChange={handleChange} checked={formData.triggerEventPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="triggerEventPsoriasis" value="לא" onChange={handleChange} checked={formData.triggerEventPsoriasis === "לא"} /> לא
              </div>
              {formData.triggerEventPsoriasis === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט.י</label>
                    <textarea className="form-control" name="triggerEventDetailsPsoriasis" value={formData.triggerEventDetailsPsoriasis} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם לדעתך יש משהו שגרם/ תרם להתפרצות המחלה שלך?</label>
              <textarea className="form-control" name="causeOpinionPsoriasis" value={formData.causeOpinionPsoriasis} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">מה הטיפול שעזר/ עוזר לך ביותר - פרט.י</label>
              <textarea className="form-control" name="bestTreatmentPsoriasis" value={formData.bestTreatmentPsoriasis} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש משהו שהמחלת הפסוריאזיס מונעת ממך לעשות?</label>
              <div className="form-check">
                <input type="radio" name="preventionPsoriasis" value="כן" onChange={handleChange} checked={formData.preventionPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="preventionPsoriasis" value="לא" onChange={handleChange} checked={formData.preventionPsoriasis === "לא"} /> לא
              </div>
              {formData.preventionPsoriasis === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם ענית כן אנא פרט.י</label>
                    <textarea className="form-control" name="preventionDetailsPsoriasis" value={formData.preventionDetailsPsoriasis} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה נצא במעקב רפואי אחר מחלה אחרת פרט לפסוריאזיס?</label>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowupPsoriasis" value="כן" onChange={handleChange} checked={formData.otherMedicalFollowupPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowupPsoriasis" value="לא" onChange={handleChange} checked={formData.otherMedicalFollowupPsoriasis === "לא"} /> לא
              </div>
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה נמנע מחשיפה הנגעים בציבור? (לובש בגדים ארוכים גם בקיץ , נמנע מלהחשף בים וכדומה)?</label>
              <div className="form-check">
                <input type="radio" name="publicExposureAvoidance" value="כן" onChange={handleChange} checked={formData.publicExposureAvoidance === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="publicExposureAvoidance" value="לא" onChange={handleChange} checked={formData.publicExposureAvoidance === "לא"} /> לא
              </div>
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אדם נוסף מהמשפחה המורחבת שלך אובחן במחלה זו?</label>
              <div className="form-check">
                <input type="radio" name="familyHistoryPsoriasis" value="כן" onChange={handleChange} checked={formData.familyHistoryPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="familyHistoryPsoriasis" value="לא" onChange={handleChange} checked={formData.familyHistoryPsoriasis === "לא"} /> לא
              </div>
              {formData.familyHistoryPsoriasis === "כן" && (
                <div className="mt-2">
                  <label className="form-label">אם כן מה הקרבה?</label>
                  {["אחים. יות", "הורים", "בני דודים", "דודים- דודות", "סבים- סבתות"].map(relation => (
                    <div className="form-check" key={relation}>
                      <input type="checkbox" name="familyHistoryRelationPsoriasis" value={relation} onChange={handleCheckboxChange} checked={formData.familyHistoryRelationPsoriasis.includes(relation)} />
                      <label className="form-check-label mx-2">{relation}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם המחלה השפיעה על הדברים הבאים?</label>
              {["בטחון עצמי", "חיי חברה", "מצב רוח", "תעסוקה", "זוגיות", "יחס להורים", "פעילות גופנית", "הערכה עצמית"].map(item => (
                <div className="form-check" key={item}>
                  <input type="checkbox" name="impactOnLifePsoriasis" value={item} onChange={handleCheckboxChange} checked={formData.impactOnLifePsoriasis.includes(item)} />
                  <label className="form-check-label mx-2">{item}</label>
                </div>
              ))}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם עברת בעבר או בהווה טיפול פסיכולוגי?</label>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatmentPsoriasis" value="כן" onChange={handleChange} checked={formData.psychologicalTreatmentPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatmentPsoriasis" value="לא" onChange={handleChange} checked={formData.psychologicalTreatmentPsoriasis === "לא"} /> לא
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם ראיתי קשר בין מצב המחלה לבין הטיפול הרגשי?</label>
              <textarea className="form-control" name="emotionalConnectionPsoriasis" value={formData.emotionalConnectionPsoriasis} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שתרצה שנדע בהקשר למחלת הפסוריאזיס שלך?</label>
              <textarea className="form-control" name="additionalInfoPsoriasis" value={formData.additionalInfoPsoriasis} onChange={handleChange} />
            </div>

            <h4 className="text-primary mt-4 mb-3">שאלון מתוקף תפיסת מחלה (מחלת הפסוריאזיס)</h4>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם ערכת שינוי בדיאטה בעקבות המחלה?</label>
              <div className="form-check">
                <input type="radio" name="dietChangePsoriasis" value="כן" onChange={handleChange} checked={formData.dietChangePsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="dietChangePsoriasis" value="לא" onChange={handleChange} checked={formData.dietChangePsoriasis === "לא"} /> לא
              </div>
              {formData.dietChangePsoriasis === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט מה היו השינויים</label>
                    <textarea className="form-control" name="dietChangeDetailsPsoriasis" value={formData.dietChangeDetailsPsoriasis} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אי פעם חווית הפוגה/ רמיסיה של המחלה</label>
              <div className="form-check">
                <input type="radio" name="remissionExperiencePsoriasis" value="כן" onChange={handleChange} checked={formData.remissionExperiencePsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="remissionExperiencePsoriasis" value="לא" onChange={handleChange} checked={formData.remissionExperiencePsoriasis === "לא"} /> לא
              </div>
            </div>

            {formData.remissionExperiencePsoriasis === "כן" && (
              <div className="form-group mb-3">
                <label className="form-label">אם כן- האם אתה יכול להצביע על סימנים מקדימים המופיעים לפני התפרצות חוזרת של המחלה/ התקף? או סימנים שמעידים עבורך על התפרצות קרבה?</label>
                <div className="row">
                  {[
                    "תחושת חרדה", "שינויים בראיה", "שינויים בחוש הריח", "שינויים במצב הרוח", "חום",
                    "כאבי/ מיחושי ראש", "כאבי/ מיחושי בטן", "כאבי שרירים", "קשיי שינה/ הרדמות",
                    "היפראקטיביות/ פעלתנות אינטנסיבית", "בחילה", "צרבת", "עייפות", "תחושת מועקה",
                    "אחר- פרט.י", "לא יודע.ת"
                  ].map(symptom => (
                    <div className="col-md-6" key={symptom}>
                      <div className="form-check">
                        <input type="checkbox" name="preSymptomsPsoriasis" value={symptom} onChange={handleCheckboxChange} checked={formData.preSymptomsPsoriasis.includes(symptom)} />
                        <label className="form-check-label mx-2">{symptom}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שחשוב שנדע?</label>
              <textarea className="form-control" name="additionalInfoGeneralPsoriasis" value={formData.additionalInfoGeneralPsoriasis} onChange={handleChange} />
            </div>

          </div>
        )}

        {isRA && (
          <div className="ra-section mt-5 border-top pt-4">
            <h4 className="text-primary mb-3">שאלות עבור דלקת מפרקים (RA)</h4>

            <div className="form-group mb-3">
              <label className="form-label">מהי האבחנה הרפואית של מחלתך?</label>
              <input type="text" className="form-control" name="medicalDiagnosisRA" value={formData.medicalDiagnosisRA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל פריצת RA</label>
              <input type="number" className="form-control" name="raAge" value={formData.raAge} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל אבחון הRA</label>
              <input type="number" className="form-control" name="raDiagnosisAge" value={formData.raDiagnosisAge} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם כרגע אתה מקבל טיפול כנגד המחלה?</label>
              <div className="form-check">
                <input type="radio" name="isTreatingRA" value="כן" onChange={handleChange} checked={formData.isTreatingRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="isTreatingRA" value="לא" onChange={handleChange} checked={formData.isTreatingRA === "לא"} /> לא
              </div>
            </div>

            {formData.isTreatingRA === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן איזה טיפול?</label>
                  <input type="text" className="form-control" name="treatmentDetailsRA" value={formData.treatmentDetailsRA} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">כמה זמן אתה מטופל בטיפול זה?</label>
                  <input type="text" className="form-control" name="treatmentDurationRA" value={formData.treatmentDurationRA} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">האם היו שינויים בטיפול/ במינון , אם כן מתי ומדוע?</label>
                  <textarea className="form-control" name="treatmentChangesRA" value={formData.treatmentChangesRA} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה מתמיד בטיפול?</label>
              {["כן 100% מתמיד", "80% מתמיד", "50% מתמיד", "לא מתמיד"].map(opt => (
                <div className="form-check" key={opt}>
                  <input type="radio" name="treatmentAdherenceRA" value={opt} onChange={handleChange} checked={formData.treatmentAdherenceRA === opt} /> {opt}
                </div>
              ))}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">כמה מפרקים מעורבים ( מודלקים/ אדומים/ נפוחים/ כואבים)</label>
              <input type="text" className="form-control" name="involvedJoints" value={formData.involvedJoints} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך האם יש עונה בה יש החמרה במחלה?</label>
              <input type="text" className="form-control" name="seasonalWorseningRA" value={formData.seasonalWorseningRA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">כמה פעמים בשנה אתה מבקר רופא.ה בעקבות הRA</label>
              <input type="number" className="form-control" name="doctorVisitsRA" value={formData.doctorVisitsRA} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם טופלת בפיזיותרפיה בעקבות המחלה?</label>
              <div className="form-check">
                <input type="radio" name="physiotherapyRA" value="כן" onChange={handleChange} checked={formData.physiotherapyRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="physiotherapyRA" value="לא" onChange={handleChange} checked={formData.physiotherapyRA === "לא"} /> לא
              </div>
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש לך מחלות כרוניות נוספות</label>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseasesRA" value="כן" onChange={handleChange} checked={formData.otherChronicDiseasesRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseasesRA" value="לא" onChange={handleChange} checked={formData.otherChronicDiseasesRA === "לא"} /> לא
              </div>
            </div>

            {formData.otherChronicDiseasesRA === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל החלו התסמינים?</label>
                  <input type="number" className="form-control" name="otherChronicSymptomsAgeRA" value={formData.otherChronicSymptomsAgeRA} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל אובחנו</label>
                  <input type="number" className="form-control" name="otherChronicDiagnosisAgeRA" value={formData.otherChronicDiagnosisAgeRA} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה מטופל כרגע או טופלת בעבר ברפואה משלימה?</label>
              <div className="form-check">
                <input type="radio" name="complementaryMedicineRA" value="כן" onChange={handleChange} checked={formData.complementaryMedicineRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="complementaryMedicineRA" value="לא" onChange={handleChange} checked={formData.complementaryMedicineRA === "לא"} /> לא
              </div>
              {formData.complementaryMedicineRA === "כן" && (
                <div className="mt-2">
                  <label className="form-label">אם כן, מה הסיבה לפניה לטיפול משלים?</label>
                  <input type="text" className="form-control mb-2" name="complementaryMedicineReasonRA" value={formData.complementaryMedicineReasonRA} onChange={handleChange} />
                  <label className="form-label">אם כן, מה הטיפול? לאורך כמה זמן טופלת? והאם היתה הטבה?</label>
                  <textarea className="form-control" name="complementaryMedicineDetailsRA" value={formData.complementaryMedicineDetailsRA} onChange={handleChange} />
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להחמרה במצב RA?</label>
              <textarea className="form-control" name="aggravatingFactorsRA" value={formData.aggravatingFactorsRA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להטבה במצב הRA?</label>
              <textarea className="form-control" name="alleviatingFactorsRA" value={formData.alleviatingFactorsRA} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם התפרצות המחלה התרחשה בסמיכות להתפרצות מחלה אחרת/ בסמיכות לארוע משנה חיים/תאונה/ טראומה?</label>
              <div className="form-check">
                <input type="radio" name="triggerEventRA" value="כן" onChange={handleChange} checked={formData.triggerEventRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="triggerEventRA" value="לא" onChange={handleChange} checked={formData.triggerEventRA === "לא"} /> לא
              </div>
              {formData.triggerEventRA === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט.י</label>
                    <textarea className="form-control" name="triggerEventDetailsRA" value={formData.triggerEventDetailsRA} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם לדעתך יש משהו שגרם/ תרם להתפרצות המחלה שלך?</label>
              <textarea className="form-control" name="causeOpinionRA" value={formData.causeOpinionRA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">מה הטיפול שעזר/ עוזר לך ביותר - פרט.י</label>
              <textarea className="form-control" name="bestTreatmentRA" value={formData.bestTreatmentRA} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש משהו שהמחלת הRA מונעת ממך לעשות?</label>
              <div className="form-check">
                <input type="radio" name="preventionRA" value="כן" onChange={handleChange} checked={formData.preventionRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="preventionRA" value="לא" onChange={handleChange} checked={formData.preventionRA === "לא"} /> לא
              </div>
              {formData.preventionRA === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם ענית כן אנא פרט.י</label>
                    <textarea className="form-control" name="preventionDetailsRA" value={formData.preventionDetailsRA} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה נמצא במעקב רפואי אחר מחלה אחרת פרט לRA?</label>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowupRA" value="כן" onChange={handleChange} checked={formData.otherMedicalFollowupRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowupRA" value="לא" onChange={handleChange} checked={formData.otherMedicalFollowupRA === "לא"} /> לא
              </div>
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אדם נוסף מהמשפחה המורחבת שלך אובחן במחלה זו?</label>
              <div className="form-check">
                <input type="radio" name="familyHistoryRA" value="כן" onChange={handleChange} checked={formData.familyHistoryRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="familyHistoryRA" value="לא" onChange={handleChange} checked={formData.familyHistoryRA === "לא"} /> לא
              </div>
              {formData.familyHistoryRA === "כן" && (
                <div className="mt-2">
                  <label className="form-label">אם כן מה הקרבה?</label>
                  {["אחים. יות", "הורים", "בני דודים", "דודים- דודות", "סבים- סבתות"].map(relation => (
                    <div className="form-check" key={relation}>
                      <input type="checkbox" name="familyHistoryRelationRA" value={relation} onChange={handleCheckboxChange} checked={formData.familyHistoryRelationRA.includes(relation)} />
                      <label className="form-check-label mx-2">{relation}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם המחלה השפיעה על הדברים הבאים?</label>
              {["בטחון עצמי", "חיי חברה", "מצב רוח", "תעסוקה", "זוגיות", "יחס להורים", "פעילות גופנית", "הערכה עצמית"].map(item => (
                <div className="form-check" key={item}>
                  <input type="checkbox" name="impactOnLifeRA" value={item} onChange={handleCheckboxChange} checked={formData.impactOnLifeRA.includes(item)} />
                  <label className="form-check-label mx-2">{item}</label>
                </div>
              ))}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם עברת בעבר או בהווה טיפול פסיכולוגי?</label>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatmentRA" value="כן" onChange={handleChange} checked={formData.psychologicalTreatmentRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatmentRA" value="לא" onChange={handleChange} checked={formData.psychologicalTreatmentRA === "לא"} /> לא
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם ראיתי קשר בין מצב המחלה לבין הטיפול הרגשי?</label>
              <textarea className="form-control" name="emotionalConnectionRA" value={formData.emotionalConnectionRA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שתרצה שנדע בהקשר למחלת ה-RA שלך?</label>
              <textarea className="form-control" name="additionalInfoRA" value={formData.additionalInfoRA} onChange={handleChange} />
            </div>

            <h4 className="text-primary mt-4 mb-3">שאלון מתוקף תפיסת מחלה (מחלת RA)</h4>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם ערכת שינוי בדיאטה בעקבות המחלה?</label>
              <div className="form-check">
                <input type="radio" name="dietChangeRA" value="כן" onChange={handleChange} checked={formData.dietChangeRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="dietChangeRA" value="לא" onChange={handleChange} checked={formData.dietChangeRA === "לא"} /> לא
              </div>
              {formData.dietChangeRA === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט מה היו השינויים</label>
                    <textarea className="form-control" name="dietChangeDetailsRA" value={formData.dietChangeDetailsRA} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אי פעם חווית הפוגה/ רמיסיה של המחלה</label>
              <div className="form-check">
                <input type="radio" name="remissionExperienceRA" value="כן" onChange={handleChange} checked={formData.remissionExperienceRA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="remissionExperienceRA" value="לא" onChange={handleChange} checked={formData.remissionExperienceRA === "לא"} /> לא
              </div>
            </div>

            {formData.remissionExperienceRA === "כן" && (
              <div className="form-group mb-3">
                <label className="form-label">אם כן- האם אתה יכול להצביע על סימנים מקדימים המופיעים לפני התפרצות חוזרת של המחלה/ התקף? או סימנים שמעידים עבורך על התפרצות קרבה?</label>
                <div className="row">
                  {[
                    "תחושת חרדה", "שינויים בראיה", "שינויים בחוש הריח", "שינויים במצב הרוח", "חום",
                    "כאבי/ מיחושי ראש", "כאבי/ מיחושי בטן", "כאבי שרירים", "קשיי שינה/ הרדמות",
                    "היפראקטיביות/ פעלתנות אינטנסיבית", "בחילה", "צרבת", "עייפות", "תחושת מועקה",
                    "אחר- פרט.י", "לא יודע.ת"
                  ].map(symptom => (
                    <div className="col-md-6" key={symptom}>
                      <div className="form-check">
                        <input type="checkbox" name="preSymptomsRA" value={symptom} onChange={handleCheckboxChange} checked={formData.preSymptomsRA.includes(symptom)} />
                        <label className="form-check-label mx-2">{symptom}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שחשוב שנדע?</label>
              <textarea className="form-control" name="additionalInfoGeneralRA" value={formData.additionalInfoGeneralRA} onChange={handleChange} />
            </div>

          </div>
        )}

        {isPSA && (
          <div className="psa-section mt-5 border-top pt-4">
            <h4 className="text-primary mb-3">שאלות עבור דלקת מפרקים פסוריאטית (PSA)</h4>

            <div className="form-group mb-3">
              <label className="form-label">מהי האבחנה הרפואית של מחלתך?</label>
              <input type="text" className="form-control" name="medicalDiagnosisPSA" value={formData.medicalDiagnosisPSA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל פריצת PSA</label>
              <input type="number" className="form-control" name="psaAge" value={formData.psaAge} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">גיל אבחון הPSA</label>
              <input type="number" className="form-control" name="psaDiagnosisAge" value={formData.psaDiagnosisAge} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אובחנת גם בפסוריאזיס?</label>
              <div className="form-check">
                <input type="radio" name="alsoPsoriasis" value="כן" onChange={handleChange} checked={formData.alsoPsoriasis === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="alsoPsoriasis" value="לא" onChange={handleChange} checked={formData.alsoPsoriasis === "לא"} /> לא
              </div>
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם כרגע אתה מקבל טיפול כנגד PSA?</label>
              <div className="form-check">
                <input type="radio" name="isTreatingPSA" value="כן" onChange={handleChange} checked={formData.isTreatingPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="isTreatingPSA" value="לא" onChange={handleChange} checked={formData.isTreatingPSA === "לא"} /> לא
              </div>
            </div>

            {formData.isTreatingPSA === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן איזה טיפול?</label>
                  <input type="text" className="form-control" name="treatmentDetailsPSA" value={formData.treatmentDetailsPSA} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">כמה זמן אתה מטופל בטיפול זה?</label>
                  <input type="text" className="form-control" name="treatmentDurationPSA" value={formData.treatmentDurationPSA} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">האם היו שינויים בטיפול/ במינון , אם כן מתי ומדוע?</label>
                  <textarea className="form-control" name="treatmentChangesPSA" value={formData.treatmentChangesPSA} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה מתמיד בטיפול?</label>
              {["כן 100% מתמיד", "80% מתמיד", "50% מתמיד", "לא מתמיד"].map(opt => (
                <div className="form-check" key={opt}>
                  <input type="radio" name="treatmentAdherencePSA" value={opt} onChange={handleChange} checked={formData.treatmentAdherencePSA === opt} /> {opt}
                </div>
              ))}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">כמה מפרקים מעורבים ( מודלקים/ אדומים/ נפוחים/ כואבים)</label>
              <input type="text" className="form-control" name="involvedJointsPSA" value={formData.involvedJointsPSA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך האם יש עונה בה יש החמרה במחלה?</label>
              <input type="text" className="form-control" name="seasonalWorseningPSA" value={formData.seasonalWorseningPSA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">כמה פעמים בשנה אתה מבקר רופא.ה בעקבות הPSA</label>
              <input type="number" className="form-control" name="doctorVisitsPSA" value={formData.doctorVisitsPSA} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם טופלת בפיזיותרפיה בעקבות המחלה?</label>
              <div className="form-check">
                <input type="radio" name="physiotherapyPSA" value="כן" onChange={handleChange} checked={formData.physiotherapyPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="physiotherapyPSA" value="לא" onChange={handleChange} checked={formData.physiotherapyPSA === "לא"} /> לא
              </div>
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש לך מחלות כרוניות נוספות</label>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseasesPSA" value="כן" onChange={handleChange} checked={formData.otherChronicDiseasesPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherChronicDiseasesPSA" value="לא" onChange={handleChange} checked={formData.otherChronicDiseasesPSA === "לא"} /> לא
              </div>
            </div>

            {formData.otherChronicDiseasesPSA === "כן" && (
              <div className="bg-light p-3 mb-3 rounded">
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל החלו התסמינים?</label>
                  <input type="number" className="form-control" name="otherChronicSymptomsAgePSA" value={formData.otherChronicSymptomsAgePSA} onChange={handleChange} />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">אם כן, באיזה גיל אובחנו</label>
                  <input type="number" className="form-control" name="otherChronicDiagnosisAgePSA" value={formData.otherChronicDiagnosisAgePSA} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה מטופל כרגע או טופלת בעבר ברפואה משלימה?</label>
              <div className="form-check">
                <input type="radio" name="complementaryMedicinePSA" value="כן" onChange={handleChange} checked={formData.complementaryMedicinePSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="complementaryMedicinePSA" value="לא" onChange={handleChange} checked={formData.complementaryMedicinePSA === "לא"} /> לא
              </div>
              {formData.complementaryMedicinePSA === "כן" && (
                <div className="mt-2">
                  <label className="form-label">אם כן, מה הסיבה לפניה לטיפול משלים?</label>
                  <input type="text" className="form-control mb-2" name="complementaryMedicineReasonPSA" value={formData.complementaryMedicineReasonPSA} onChange={handleChange} />
                  <label className="form-label">אם כן, מה הטיפול? לאורך כמה זמן טופלת? והאם היתה הטבה?</label>
                  <textarea className="form-control" name="complementaryMedicineDetailsPSA" value={formData.complementaryMedicineDetailsPSA} onChange={handleChange} />
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להחמרה במצב PSA?</label>
              <textarea className="form-control" name="aggravatingFactorsPSA" value={formData.aggravatingFactorsPSA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">לתחושתך, מה גורם להטבה במצב הPSA?</label>
              <textarea className="form-control" name="alleviatingFactorsPSA" value={formData.alleviatingFactorsPSA} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם התפרצות המחלה התרחשה בסמיכות להתפרצות מחלה אחרת/ בסמיכות לארוע משנה חיים/תאונה/ טראומה?</label>
              <div className="form-check">
                <input type="radio" name="triggerEventPSA" value="כן" onChange={handleChange} checked={formData.triggerEventPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="triggerEventPSA" value="לא" onChange={handleChange} checked={formData.triggerEventPSA === "לא"} /> לא
              </div>
              {formData.triggerEventPSA === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט.י</label>
                    <textarea className="form-control" name="triggerEventDetailsPSA" value={formData.triggerEventDetailsPSA} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם לדעתך יש משהו שגרם/ תרם להתפרצות המחלה שלך?</label>
              <textarea className="form-control" name="causeOpinionPSA" value={formData.causeOpinionPSA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">מה הטיפול שעזר/ עוזר לך ביותר - פרט.י</label>
              <textarea className="form-control" name="bestTreatmentPSA" value={formData.bestTreatmentPSA} onChange={handleChange} />
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם יש משהו שהמחלת הPSA מונעת ממך לעשות?</label>
              <div className="form-check">
                <input type="radio" name="preventionPSA" value="כן" onChange={handleChange} checked={formData.preventionPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="preventionPSA" value="לא" onChange={handleChange} checked={formData.preventionPSA === "לא"} /> לא
              </div>
              {formData.preventionPSA === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם ענית כן אנא פרט.י</label>
                    <textarea className="form-control" name="preventionDetailsPSA" value={formData.preventionDetailsPSA} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אדם נוסף מהמשפחה המורחבת שלך אובחן במחלה זו?</label>
              <div className="form-check">
                <input type="radio" name="familyHistoryPSA" value="כן" onChange={handleChange} checked={formData.familyHistoryPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="familyHistoryPSA" value="לא" onChange={handleChange} checked={formData.familyHistoryPSA === "לא"} /> לא
              </div>
              {formData.familyHistoryPSA === "כן" && (
                <div className="mt-2">
                  <label className="form-label">אם כן מה הקרבה?</label>
                  {["אחים. יות", "הורים", "בני דודים", "דודים- דודות", "סבים- סבתות"].map(relation => (
                    <div className="form-check" key={relation}>
                      <input type="checkbox" name="familyHistoryRelationPSA" value={relation} onChange={handleCheckboxChange} checked={formData.familyHistoryRelationPSA.includes(relation)} />
                      <label className="form-check-label mx-2">{relation}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אתה נמצא במעקב רפואי אחר מחלה אחרת פרט לPSA?</label>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowupPSA" value="כן" onChange={handleChange} checked={formData.otherMedicalFollowupPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="otherMedicalFollowupPSA" value="לא" onChange={handleChange} checked={formData.otherMedicalFollowupPSA === "לא"} /> לא
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם המחלה השפיעה על הדברים הבאים?</label>
              {["בטחון עצמי", "חיי חברה", "מצב רוח", "תעסוקה", "זוגיות", "יחס להורים", "פעילות גופנית", "הערכה עצמית"].map(item => (
                <div className="form-check" key={item}>
                  <input type="checkbox" name="impactOnLifePSA" value={item} onChange={handleCheckboxChange} checked={formData.impactOnLifePSA.includes(item)} />
                  <label className="form-check-label mx-2">{item}</label>
                </div>
              ))}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם עברת בעבר או בהווה טיפול פסיכולוגי?</label>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatmentPSA" value="כן" onChange={handleChange} checked={formData.psychologicalTreatmentPSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="psychologicalTreatmentPSA" value="לא" onChange={handleChange} checked={formData.psychologicalTreatmentPSA === "לא"} /> לא
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">האם ראיתי קשר בין מצב המחלה לבין הטיפול הרגשי?</label>
              <textarea className="form-control" name="emotionalConnectionPSA" value={formData.emotionalConnectionPSA} onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שתרצה שנדע בהקשר למחלת ה-PSA שלך?</label>
              <textarea className="form-control" name="additionalInfoPSA" value={formData.additionalInfoPSA} onChange={handleChange} />
            </div>

            <h4 className="text-primary mt-4 mb-3">שאלון מתוקף תפיסת מחלה (מחלת PSA)</h4>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם ערכת שינוי בדיאטה בעקבות המחלה?</label>
              <div className="form-check">
                <input type="radio" name="dietChangePSA" value="כן" onChange={handleChange} checked={formData.dietChangePSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="dietChangePSA" value="לא" onChange={handleChange} checked={formData.dietChangePSA === "לא"} /> לא
              </div>
              {formData.dietChangePSA === "כן" && (
                 <div className="mt-2">
                    <label className="form-label">אם כן פרט מה היו השינויים</label>
                    <textarea className="form-control" name="dietChangeDetailsPSA" value={formData.dietChangeDetailsPSA} onChange={handleChange} />
                 </div>
              )}
            </div>

            <div className="form-group radio-preferred mb-3">
              <label className="form-label">האם אי פעם חווית הפוגה/ רמיסיה של המחלה</label>
              <div className="form-check">
                <input type="radio" name="remissionExperiencePSA" value="כן" onChange={handleChange} checked={formData.remissionExperiencePSA === "כן"} /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="remissionExperiencePSA" value="לא" onChange={handleChange} checked={formData.remissionExperiencePSA === "לא"} /> לא
              </div>
            </div>

            {formData.remissionExperiencePSA === "כן" && (
              <div className="form-group mb-3">
                <label className="form-label">אם כן- האם אתה יכול להצביע על סימנים מקדימים המופיעים לפני התפרצות חוזרת של המחלה/ התקף? או סימנים שמעידים עבורך על התפרצות קרבה?</label>
                <div className="row">
                  {[
                    "תחושת חרדה", "שינויים בראיה", "שינויים בחוש הריח", "שינויים במצב הרוח", "חום",
                    "כאבי/ מיחושי ראש", "כאבי/ מיחושי בטן", "כאבי שרירים", "קשיי שינה/ הרדמות",
                    "היפראקטיביות/ פעלתנות אינטנסיבית", "בחילה", "צרבת", "עייפות", "תחושת מועקה",
                    "אחר- פרט.י", "לא יודע.ת"
                  ].map(symptom => (
                    <div className="col-md-6" key={symptom}>
                      <div className="form-check">
                        <input type="checkbox" name="preSymptomsPSA" value={symptom} onChange={handleCheckboxChange} checked={formData.preSymptomsPSA.includes(symptom)} />
                        <label className="form-check-label mx-2">{symptom}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group mb-3">
              <label className="form-label">משהו נוסף שחשוב שנדע?</label>
              <textarea className="form-control" name="additionalInfoGeneralPSA" value={formData.additionalInfoGeneralPSA} onChange={handleChange} />
            </div>

          </div>
        )}

        <button type="submit" className="btn btn-primary mt-4">שלח</button>
      </form>
    </div>
  );
};

export default MedicalFormFirst;
