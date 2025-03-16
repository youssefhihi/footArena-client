import React, { useRef } from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Upload, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../.././components/ui/card"
import { Input } from "../.././components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm, useWatch } from "react-hook-form"
import { useOrganizationStore } from "../../store/organization-store"
import { CreateOrganizationRequest, createOrganizationSchema } from "../../validation/organization-validation"
import { FiAlertCircle } from "react-icons/fi"
import {motion} from 'framer-motion'
import { FormButton } from "../../../../commun/components/ui/button/Button"
import { Button } from "../../components/ui/button"

const url =import.meta.env.VITE_API_URL

export default function OrganizationForm() {
    const navigate = useNavigate();
    const { organizationId } = useParams();
    const isEditMode = Boolean(organizationId);
  
    const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm<CreateOrganizationRequest>({
      resolver: zodResolver(createOrganizationSchema),
    });
  
    const { isLoading, error, createOrganization, updateOrganization, getOrganizationById } = useOrganizationStore();
  
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

  
    useEffect(() => {
      if (isEditMode && organizationId) {
        const fetchData = async () => {
          const organization = await getOrganizationById(organizationId);
          if (organization) {
            setValue("name", organization.name);
            setValue("description", organization.description);
            setValue("isTeam", organization.isTeam);
            setLogoPreview(url + organization.logo); 
          }
        };
        fetchData();
      }
    }, [isEditMode, organizationId, setValue, getOrganizationById]);
  
    const onSubmit = async (data: CreateOrganizationRequest) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("isTeam", data.isTeam.toString());
      if (selectedFile) {
        formData.append("logo", selectedFile);
      }
      if (isEditMode && organizationId) {
        const res = await updateOrganization(organizationId, formData);
        if (res) navigate("/c/organizations");
      } else {
        const res = await createOrganization(formData);
        if (res) navigate("/c/organizations");
      }
    };


  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setLogoPreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const isTeam = useWatch({
    control,
    name: "isTeam",
    defaultValue: false,
  });
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-200">{isEditMode ? "Edit Organization" : "Create Organization"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data">
        <Card>
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
            <CardDescription>{isEditMode ? "Update the organization details." : "Create a new organization to participate to tournaments."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {error && Array.isArray(error) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2 mb-6 rounded-lg bg-red-500 p-4 text-sm text-red-200">
                        <FiAlertCircle className="h-5 w-5" />
                        {error.map((errorItem, index) => (
                          <p 
                          key={index}>{Object.values(errorItem)}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
            {/* Logo Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div
                className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                onClick={() => document.getElementById("logo-upload")?.click()}
              >
                {logoPreview ? (
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Organization Logo"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Upload className="mb-2 h-8 w-8" />
                    <span className="text-sm">Upload Logo</span>
                  </div>
                )}
              </div>
              <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleLogoChange}
                />
              <span className="text-sm text-gray-500">Click to upload organization logo (recommended: 200x200px)</span>
              {errors.logo?.message && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-left text-red-600 dark:text-red-400"
                    >
                      {errors.logo?.message}
                </motion.p>
              )}
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <Label>Organization Type</Label>
              <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="team"
            {...register("isTeam", { setValueAs: (value) => Boolean(value) })}
            className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
          />
          <Label htmlFor="team" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {isTeam ? "Team" : "Individual"}
          </Label>
        </div>
        {errors.isTeam?.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-left text-red-600 dark:text-red-400"
          >
            {errors.isTeam?.message}
          </motion.p>
        )}
      </div>

            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                placeholder="Enter organization name"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            {/* Organization Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your organization or team"
                rows={4}
                error={errors.description?.message}
                {...register("description")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate("/c/organizations")}>
              Cancel
            </Button>
            <FormButton disabled={isSubmitting} loading={isLoading} type="submit" style={{width: "40%"}} >
             {isEditMode ? "Update Organization" : "Create Organization"}
            </FormButton>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

