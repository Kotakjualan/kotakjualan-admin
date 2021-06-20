import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function ImageLazy(props){
  return(
    <LazyLoadImage {...props} threshold={300} placeholderSrc={"/logo.webp"} effect="blur" alt="Lazyimage from Kotakjualan.com"></LazyLoadImage>    
  )
}