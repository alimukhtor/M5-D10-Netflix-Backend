import fs from 'fs-extra'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
const {readJSON, writeJSON, writeFile} = fs




const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const moviesJSONPath = join(dataFolderPath, "movies.json")


export const getMovies =()=>  readJSON(moviesJSONPath)
export const writeMovies =(content)=> writeJSON(moviesJSONPath, content)