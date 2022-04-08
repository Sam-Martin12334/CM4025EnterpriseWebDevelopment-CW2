import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import spiderImg from './../assets/images/spider.jpg'
import scorpImg from './../assets/images/scorpion.jpg'
import catImg from './../assets/images/cat.jpg'
import walrusImg from './../assets/images/walrus.jpg'
import {Link} from 'react-router-dom'




const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    textAlign: 'center',
  },
  media: {
    height: 400,
    width: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    }
  }
}))



const itemData = [
  {
    img: spiderImg,
    title: 'Spider',
    author: '@Michael Willinger',
    link: 'https://www.pexels.com/photo/close-up-photo-of-spider-3482977/'
  },
  {
    img: scorpImg,
    title: 'Scorpion',
    author: '@Sharath G.',
    link: 'https://www.pexels.com/photo/black-and-brown-insect-with-pincers-1981542/'  
  },
  {
    img: catImg,
    title: 'Spyhnx Cat',
    author: '@KoolShooters',
    link: 'https://www.pexels.com/photo/a-blue-eyed-sphynx-cat-7680664/'  
  },
  {
    img: walrusImg,
    title: 'Walrus',
    author: '@Putulik Jaaka',
    link: 'https://www.pexels.com/photo/photo-of-walruses-with-white-tusks-3164496/'  
  }
];

export default function Home(){
  const classes = useStyles()
    return (
      <>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Welcome to the Love for the Uglies home page!
          </Typography>
          <CardContent>
          <Typography variant="h6" className={classes.title}>
            Here at the Love for the Uglies wesbite, we want to show off the beatiful animals that are considered "Ugly" by society. The images below are to show off some of our favourites!
          </Typography>
          <ImageList sx={{ width: 500, height: 450 }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<><span>by: {item.author}</span> <span>Link:  {item.link}</span></>}
            
          />
        </ImageListItem>
      ))}
    </ImageList>
          </CardContent>
        </Card>
        <Card className={classes.card}>
        </Card>
        </>

        
        
    )
}
