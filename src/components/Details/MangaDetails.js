import { Typography, Box, Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useAnimeContext } from "../../context/AnimeContext";

const styles = {
  textAlign: 'center'
}


const MangaDetails = (props) => {
  const [MangaDetails, setMangaDetails] = useState();
  const context = useAnimeContext()
  useEffect(() => {
    async function getMangaDetails(id) {
      const { data } = await axios.get(`https://api.jikan.moe/v3/manga/${id}`)
      setMangaDetails(data)
    }
    getMangaDetails(context.id)
  }, [setMangaDetails, MangaDetails, context.id])

  if (!MangaDetails) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <Typography sx={styles} variant="h6">{MangaDetails?.title_english}</Typography>
      <div className="details">
        <img className="detailsImg" src={MangaDetails.image_url} alt="Anime Poster" />
        <Typography sx={{margin: '2rem', textAlign: 'left'}} variant="p">{MangaDetails?.synopsis}</Typography>
      </div>
      <Typography sx={{margin: '2rem'}} variant="p">Volumes: {MangaDetails?.volumes} Chapters: {MangaDetails?.chapters}</Typography>
    </Box>
  )
}

export default MangaDetails