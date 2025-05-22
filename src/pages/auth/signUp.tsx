import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { useTranslation } from "react-i18next";
// import { signup } from "@/api/auth";
import { FaEnvelope, FaLock, FaUser, FaUsers, FaUtensils, FaChalkboardTeacher, FaUserShield, FaIdCard, FaPhone, FaChevronRight } from "react-icons/fa";
import logo from "@/assets/istockphoto-1165158707-612x612-removebg-preview.png"
import { signup } from "@/api/login";

// Define user roles
const userRoles = [
  { id: "parent", label: "Parent", icon: <FaUsers className="mr-2" />, description: "Accédez aux informations de votre enfant" },
  { id: "educator", label: "Éducateur", icon: <FaChalkboardTeacher className="mr-2" />, description: "Gérez les activités et présences" },
  { id: "kitchen", label: "Personnel de cuisine", icon: <FaUtensils className="mr-2" />, description: "Planifiez les repas" },
  { id: "admin", label: "Administrateur", icon: <FaUserShield className="mr-2" />, description: "Gérez l'ensemble du système" }
];

interface SignupFormValues {
  name: string;
  userName: string;
  email: string;
  // phone: string;
  password: string;
  re_password: string;
  role: string;
}

interface SignupFormValuesPost {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}

const SignUp = () => {
//   const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("parent");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nonFieldError, setNonFieldError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (values: SignupFormValuesPost) => signup({ ...values, role: selectedRole }),
    onError: (error: any) => {
      setEmailError("");
      setPasswordError("");
      setNonFieldError("");

      if (error?.response?.data) {
        const errorData = error.response.data;

        if (errorData?.password) {
          const passwordErrors = errorData.password
            .map((errorMessage: string) => errorMessage)
            .join(" ");
          setPasswordError(passwordErrors);
        }

        if (errorData?.email) {
          const emailErrors = errorData.email
            .map((errorMessage: string) => {
              if (errorMessage === "User Account with this Email Address already exists.") {
                return "Un compte avec cette adresse email existe déjà.";
              }
              return errorMessage;
            })
            .join(" ");
          setEmailError(emailErrors);
        }

        if (errorData?.non_field_errors) {
          setNonFieldError(errorData.non_field_errors.join(" "));
        }
        if(errorData?.detail){
          setNonFieldError(errorData.detail);
        }
      } else {
        setNonFieldError(error?.toString() || "Une erreur est survenue");
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("le nom est requis"),
    userName: Yup.string().required("Le nom d'utilisateur est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est requis"),
    // phone: Yup.string()
    //   .matches(/^[0-9+\s-]{8,15}$/, "Numéro de téléphone invalide")
    //   .required("Le numéro de téléphone est requis"),
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
      .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .required("Le mot de passe est requis"),
    re_password: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
      .required("La confirmation du mot de passe est requise"),
  });

  const initialValues: SignupFormValues = {
    name: "",
    userName: "",
    email: "",
    // phone: "",
    password: "",
    re_password: "",
    role: "parent"
  };

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-row w-full overflow-hidden">
      {/* Left Panel - Match the login page design */}
      <div className="relative w-1/2 bg-gradient-to-br from-[#FCF259] to-[#c9c046] flex flex-col items-start justify-center pl-16 text-white font-poppins overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 bg-blue-600 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PGNpcmNsZSBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiIGN4PSIzMiIgY3k9IjM0IiByPSIxIi8+PC9nPjwvc3ZnPg==')] bg-repeat" />
        </div>

        <div className="absolute top-6 left-6 flex items-center z-10">
          <img
            src={logo}
            alt="Crèche Logo"
            className="w-20 h-20"
          />
          <h2 className="text-2xl font-bold">BDS Creche</h2>
        </div>

        <div className="relative z-10 pr-8 mt-10d">
          <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-sm">
            Rejoignez notre communauté CrècheConnect
          </h1>
          
          <p className="text-xl mb-10 pr-12 text-white opacity-90">
            Créez votre compte pour accéder à tous nos services et participer à notre communauté éducative.
          </p>
          
          <div className="space-y-4 w-full">
            {userRoles.map((role) => (
              <div 
                key={role.id}
                className={`p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                  selectedRole === role.id 
                    ? "bg-white text-[#c9c046] shadow-lg transform scale-105" 
                    : "bg-white bg-opacity-10 hover:bg-opacity-15 text-white hover:translate-x-1"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`text-xl mr-3 ${selectedRole === role.id ? "text-[#c9c046]" : "text-black"}`}>
                      {role.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${selectedRole === role.id ? "text-[#c9c046]" : "text-black"}`}>{role.label}</h3>
                      <p className={`text-sm ${selectedRole === role.id ? "text-[#c9c046]" : "text-black opacity-80"}`}>
                        {role.description}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className={`${selectedRole === role.id ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full h-full px-10 pt-12 bg-white shadow-xl overflow-y-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Créer un compte
            </h2>
            <p className="text-gray-600">
              Veuillez remplir les informations ci-dessous pour vous inscrire
              {selectedRole === "parent" ? " en tant que parent" : 
              selectedRole === "educator" ? " en tant qu'éducateur" : 
              selectedRole === "kitchen" ? " en tant que personnel de cuisine" : 
              " en tant qu'administrateur"}
            </p>
          </div>

          {/* Mobile Role Selector - Only visible on small screens */}
          <div className="lg:hidden mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Je m'inscris en tant que :</p>
            <div className="grid grid-cols-2 gap-3">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedRole === role.id
                      ? "bg-[#e8db29] text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                  }`}
                >
                  {role.icon} {role.label}
                </button>
              ))}
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Name Fields - Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        type="text"
                        name="name"
                        className="w-full pl-11 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700"
                        placeholder="nom"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-sm mt-1 ml-1"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        type="text"
                        name="userName"
                        className="w-full pl-11 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700"
                        placeholder="Nom d'utilisateur"
                      />
                    </div>
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-600 text-sm mt-1 ml-1"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      className={`w-full pl-11 py-4 border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700`}
                      placeholder="Adresse email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1 ml-1"
                  />
                  {emailError && <p className="text-red-600 text-sm mt-1 ml-1">{emailError}</p>}
                </div>

                {/* <div>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="tel"
                      name="phone"
                      className="w-full pl-11 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700"
                      placeholder="Numéro de téléphone"
                    />
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600 text-sm mt-1 ml-1"
                  />
                </div> */}

                {/* Password Fields */}
                <div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="password"
                      className={`w-full pl-11 py-4 border ${
                        passwordError ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700`}
                      placeholder="Mot de passe"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1 ml-1"
                  />
                  {passwordError && <p className="text-red-600 text-sm mt-1 ml-1">{passwordError}</p>}
                </div>

                <div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="re_password"
                      className="w-full pl-11 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700"
                      placeholder="Confirmer le mot de passe"
                    />
                  </div>
                  <ErrorMessage
                    name="re_password"
                    component="div"
                    className="text-red-600 text-sm mt-1 ml-1"
                  />
                </div>

                {/* Parent-specific fields would appear here */}
                {selectedRole === "parent" && (
                  <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-100">
                    <p className="text-sm text-yellow-700">
                      En tant que parent, vous pourrez ajouter les informations de votre enfant après la création de votre compte.
                    </p>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start mt-6">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      name="terms"
                      id="terms"
                      className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#e8db29]"
                    />
                  </div>
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                    J'accepte les <a href="#" className="text-[#e8db29] hover:text-[#c9c046] hover:underline font-medium">Conditions d'utilisation</a> et 
                    la <a href="#" className="text-[#e8db29] hover:text-[#c9c046] hover:underline font-medium">Politique de confidentialité</a>
                  </label>
                </div>

                {/* Non-field Errors */}
                {nonFieldError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg mt-4">
                    <p className="text-center text-red-600 text-sm">{nonFieldError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 mt-4 bg-gradient-to-r from-[#e8db29] to-[#e8db29] hover:from-[#e8db29] hover:to-[#e8db29] text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Inscription en cours...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      S'inscrire
                      <FaChevronRight className="ml-2" />
                    </span>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-8 text-center pb-6">
            <p className="text-gray-600">
              Vous avez déjà un compte?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="font-medium text-[#e8db29] hover:text-[#c9c046] transition-colors"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;