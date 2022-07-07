import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {connect} from "react-redux";
import FeaturedPost from "../../blog/FeaturedPost";
import {
    clearImg,
    getAllCollectionsByUserId,
    getItemsByCollectionId,
    deleteCollection, download
} from "../../../store/reducer/collection";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ADD_COLLECTION, COLLECTION_LIST} from "../../../util/constants/pages";
import AddItem from "../../../component/collection/addItem";
import AddCollection from "../../../component/collection/addCollection";



const theme = createTheme();

function CollectionContent({
                               user,
                               collections,
                               collectionPageVal,
                               getItemsByCollectionId,
                               clearImg,
                               getAllCollectionsByUserId,
                               deleteCollection,
                               download
                           }) {


    useEffect(() => {
        clearImg()
        user.id && getAllCollectionsByUserId(user.id)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <main>
                {
                    collectionPageVal === COLLECTION_LIST ? <Grid container spacing={4} alignItems={'center'}>
                        {
                            collections.map(collection => (
                                <FeaturedPost download={download} key={collection.id} collection={collection} user_id={user.id}
                                              getItemsByCollectionId={getItemsByCollectionId}
                                              deleteCollection={deleteCollection}/>
                            ))}
                    </Grid> : collectionPageVal === ADD_COLLECTION ? <AddCollection/> :<AddItem/>
                }
            </main>
        </ThemeProvider>
    )
}

export default connect(({collection: {collections}}) => ({collections}), ({
    getItemsByCollectionId,
    getAllCollectionsByUserId,
    clearImg,
    deleteCollection,
    download
}))(CollectionContent)