import mongoose from "mongoose";

interface ICity {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

const CitySchema = new mongoose.Schema<ICity>({
  city: { type: String, required: true },
  country: { type: String, required: true },
  clues: { type: [String], required: true },
  fun_fact: { type: [String], required: true },
  trivia: { type: [String], required: true },
});

const City = mongoose.model<ICity>("City", CitySchema);

export { City, CitySchema, ICity };
