import { City } from "../models/city";

export const getAllCities = async () => await City.find();

export const getCityByName = async (city: string) =>
  await City.findOne({ city });

export const getRandomCity = async () => {
  const cities = await City.find();
  return cities[Math.floor(Math.random() * cities.length)];
};
