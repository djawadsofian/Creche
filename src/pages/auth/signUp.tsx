import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { useTranslation } from "react-i18next";
// import { signup } from "@/api/auth";
import { FaEnvelope, FaLock, FaUser, FaUsers, FaUtensils, FaChalkboardTeacher, FaUserShield, FaIdCard, FaPhone } from "react-icons/fa";

// Define user roles
const userRoles = [
  { id: "parent", label: "Parent", icon: <FaUsers className="mr-2" />, description: "Accédez aux informations de votre enfant" },
  { id: "educator", label: "Éducateur", icon: <FaChalkboardTeacher className="mr-2" />, description: "Gérez les activités et présences" },
  { id: "kitchen", label: "Personnel de cuisine", icon: <FaUtensils className="mr-2" />, description: "Planifiez les repas" },
  { id: "admin", label: "Administrateur", icon: <FaUserShield className="mr-2" />, description: "Gérez l'ensemble du système" }
];

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  re_password: string;
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
    // mutationFn: (values: SignupFormValues) => signup({ ...values, role: selectedRole }),
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
      navigate("/registration-success");
    },
  });

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom de famille est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est requis"),
    phone: Yup.string()
      .matches(/^[0-9+\s-]{8,15}$/, "Numéro de téléphone invalide")
      .required("Le numéro de téléphone est requis"),
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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    <div className="flex flex-row w-full min-h-screen bg-gray-50">
      {/* Left Panel */}
      <div className="relative w-1/3 bg-blue-600 hidden lg:flex flex-col">
        <div className="absolute top-6 left-6 flex items-center">
          <img
            src="/api/placeholder/50/50"
            alt="Crèche Logo"
            className="w-12 h-12 mr-2"
          />
          <h2 className="text-2xl font-bold text-white">CrècheConnect</h2>
        </div>

        <div className="flex flex-col justify-center items-center h-full px-8 text-white">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Rejoignez notre communauté CrècheConnect
          </h1>
          
          <div className="space-y-6 mb-8">
            {userRoles.map((role) => (
              <div 
                key={role.id}
                className={`p-4 rounded-lg transition-all cursor-pointer ${
                  selectedRole === role.id 
                    ? "bg-white bg-opacity-20 transform scale-105" 
                    : "bg-white bg-opacity-10 hover:bg-opacity-15"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center mb-2">
                  {React.cloneElement(role.icon, { className: "text-2xl mr-3" })}
                  <h3 className="text-xl font-semibold">{role.label}</h3>
                </div>
                <p className="text-sm opacity-90">{role.description}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-center opacity-80 mt-auto mb-8">
            Nous prenons votre vie privée au sérieux.<br />
            Toutes vos données sont sécurisées et protégées.
          </p>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          {/* Mobile Role Selector */}
          <div className="lg:hidden mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Je m'inscris en tant que :</h2>
            <div className="grid grid-cols-2 gap-2">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    selectedRole === role.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {role.icon} {role.label}
                </button>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Créer un compte
          </h2>
          <p className="text-gray-600 mb-6">
            Veuillez remplir les informations ci-dessous pour vous inscrire
            {selectedRole === "parent" ? " en tant que parent" : 
             selectedRole === "educator" ? " en tant qu'éducateur" : 
             selectedRole === "kitchen" ? " en tant que personnel de cuisine" : 
             " en tant qu'administrateur"}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Name Fields - Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        type="text"
                        name="firstName"
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Prénom"
                      />
                    </div>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Field
                        type="text"
                        name="lastName"
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nom de famille"
                      />
                    </div>
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      className={`w-full pl-10 py-3 border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Adresse email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                  {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
                </div>

                <div>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="tel"
                      name="phone"
                      className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Numéro de téléphone"
                    />
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Password Fields */}
                <div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="password"
                      className={`w-full pl-10 py-3 border ${
                        passwordError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Mot de passe"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                  {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
                </div>

                <div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="re_password"
                      className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirmer le mot de passe"
                    />
                  </div>
                  <ErrorMessage
                    name="re_password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Parent-specific fields would appear here */}
                {selectedRole === "parent" && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 mb-4">
                      En tant que parent, vous pourrez ajouter les informations de votre enfant après la création de votre compte.
                    </p>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      name="terms"
                      id="terms"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    J'accepte les <a href="#" className="text-blue-600 hover:underline">Conditions d'utilisation</a> et 
                    la <a href="#" className="text-blue-600 hover:underline">Politique de confidentialité</a>
                  </label>
                </div>

                {/* Non-field Errors */}
                {nonFieldError && (
                  <p className="text-center text-red-600 text-sm">{nonFieldError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-center text-gray-600">
            Vous avez déjà un compte?{" "}
            <button 
              onClick={() => navigate("/login")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;