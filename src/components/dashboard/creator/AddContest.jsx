import { ImagePlus, PlusCircle, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  DangerousContentCheck,
  FilCheck,
  NumberValidationCheck,
  StringValidationCheck,
} from "../../../utils/custom-validation/CustomValidation";
import { PostFunction } from "../../../utils/PostFunction";

const AddContest = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const [deadline, setDeadline] = useState(null);
  const [loading, setloading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("");

  const imageFile = watch("image");
  const [preview, setPreview] = useState(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem("contestDraft");
    if (draft) {
      const data = JSON.parse(draft);
      reset(data);
      setDeadline(data.deadline ? new Date(data.deadline) : null);
      toast.info("Draft loaded from previous session");
    }
  }, [reset]);

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = watch((value) => {
      const dataToSave = { ...value, deadline };
      localStorage.setItem("contestDraft", JSON.stringify(dataToSave));
      setAutoSaveStatus("Draft saved");
      setTimeout(() => setAutoSaveStatus(""), 2000);
    });
    return () => subscription.unsubscribe();
  }, [watch, deadline]);

  useEffect(() => {
    if (!imageFile || imageFile.length === 0 || errors?.image?.message) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile[0]);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, errors?.image?.message]);

  const onSubmit = async (data) => {
    try {
      setloading(true);
      data.deadline = deadline;
      const res = await PostFunction("/api/creator/create", data);
      toast.success("Contest Added Successfully 🎉");
      reset();
      setDeadline(null);
    } catch (err) {
      toast.error("Failed to add contest. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-zinc-800 dark:text-white">
          <PlusCircle className="w-8 h-8 text-pink-500" />
          Add New Contest
        </h2>
        {autoSaveStatus && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <Save className="w-4 h-4" />
            {autoSaveStatus}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contest Name */}
        <div>
          <label className="label">Contest Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Contest name is required",
              ...DangerousContentCheck,
            })}
            className="input"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Contest Image</label>

          {!preview ? (
            <label className="upload-box">
              <ImagePlus className="w-10 h-10 text-pink-500 mb-2" />
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  ...FilCheck,
                })}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={preview}
                className="h-48 w-full object-cover rounded-xl"
                alt="preview"
              />
              <button
                type="button"
                onClick={() => reset({ image: null })}
                className="absolute top-2 right-2 bg-black/60 p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4 text-white hover:text-pink-500" />
              </button>
            </div>
          )}

          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="label">Entry Price ($)</label>
          <input
            type="number"
            {...register("price", {
              required: "Entry price is required",
              ...NumberValidationCheck,
            })}
            className="input"
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        {/* Prize Money */}
        <div>
          <label className="label">Prize Money ($)</label>
          <input
            type="number"
            {...register("prizeMoney", {
              required: "Prize money is required",
              ...NumberValidationCheck,
            })}
            className="input"
          />
          {errors.prizeMoney && (
            <p className="error">{errors.prizeMoney.message}</p>
          )}
        </div>

        {/* Contest Type */}
        <div>
          <label className="label">Contest Type</label>
          <select
            {...register("type", {
              required: "Contest type is required",
              ...DangerousContentCheck,
            })}
            className="input"
          >
            <option value="">Select Type</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Content Writing">Content Writing</option>
          </select>
          {errors.type && <p className="error">{errors.type.message}</p>}
        </div>

        {/* Deadline */}
        <div>
          <label className="label">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input"
            placeholderText="Select deadline"
            minDate={new Date()}
            required="Deadline is required"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            rows="4"
            {...register("description", {
              required: "Description is required",
              ...StringValidationCheck,
            })}
            className="input"
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>

        {/* Task Instruction */}
        <div className="md:col-span-2">
          <label className="label">Task Instruction</label>
          <textarea
            rows="4"
            {...register("taskInstruction", {
              required: "Task instruction is required",
              ...StringValidationCheck,
            })}
            className="input"
          />
          {errors.taskInstruction && (
            <p className="error">{errors.taskInstruction.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] transition"
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
