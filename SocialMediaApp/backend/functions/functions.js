import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import path from 'path'

export const deleteFilesFromFolder= (file,folderPath)=>{
    fs.readdir(folderPath,(err)=>{
        if(err){
            console.error(err)
            return
        }

        
            //for deleting files
        fs.unlink(folderPath,err=>{
            if(err){
                console.error(`Error deleting file ${filePath}`,err)
                return;
            }
            
        })

    })
}