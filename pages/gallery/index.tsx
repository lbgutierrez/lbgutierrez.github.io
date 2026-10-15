import Redirect from '@/components/Redirect'

// /gallery/ ahora es /trabajo/: se mantiene para no romper enlaces antiguos
const GalleryRedirect = () => <Redirect to='/trabajo/' />

export default GalleryRedirect
