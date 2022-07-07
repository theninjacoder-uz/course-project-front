import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getLatest, getTags, getItemsByCollectionId, getItemsByTag, download} from "../../store/reducer/collection";
import {useNavigate} from "react-router";
import {changeLanguage, getMe} from "../../store/reducer/user";
import {LANGUAGE, MODE} from "../../util/constants";
import {ENG, RUS} from "../../util/constants/language";


const theme = createTheme();

function Main({
                  collections,
                  tags,
                  content,
                  getLatest,
                  getTags,
                  user,
                  getItemsByCollectionId,
                  getItemsByTag,
                  download,
                  changeLanguage,
                  getMe
              }) {
    const navigate = useNavigate()

    const [lan, setLan] = useState(user.id ? user.language : localStorage.getItem(LANGUAGE) ? localStorage.getItem(LANGUAGE) : ENG)
    const [mode, setMode] = useState(localStorage.getItem(MODE) ? localStorage.getItem(MODE) : true)

    function choose_tag(tag_id) {
        getItemsByTag(tag_id)
        navigate('/itemsByTag')
    }


    useEffect(() => {
        getTags()
        getLatest()
        getMe()
    }, [])

    function changeLan() {
        const lang = lan === ENG ? RUS : ENG
        setLan(lang)
        localStorage.setItem(LANGUAGE, lang)
        changeLanguage(user.id, lang)
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header mode={mode} setMode={setMode} title={lan === ENG ? "Collection Management" : 'Управление коллекцией'} lan={lan} tags={tags}
                    choose_tag={choose_tag} changeLan={changeLan}
                    user={user}/>
            {content ? content : collections[0] ? <main>
                <MainFeaturedPost collection={collections[0]} getItemsByCollectionId={getItemsByCollectionId}
                                  download={download}/>
                <Grid container spacing={4} alignItems={'center'}>
                    {
                        collections.map((collection, index) => (
                            index > 0 && index < 5 ? <FeaturedPost key={collection.id} collection={collection}
                                                                   getItemsByCollectionId={getItemsByCollectionId}
                                                                   download={download}/> : ''
                        ))}
                </Grid>
            </main> : ''}
            <Footer
                mode={mode}
                title={lan === ENG ? "Collection Management" : 'Управление коллекцией'}
                description={lan === ENG ? "Collections management involves the development, storage, and preservation of cultural property, as well as objects of contemporary culture (including contemporary art, literature, technology, and documents) in museums, libraries, archives and private collections." : 'Управление коллекциями включает разработку, хранение и сохранение культурных ценностей, а также предметов современной культуры (включая современное искусство, литературу, технику и документы) в музеях, библиотеках, архивах и частных коллекциях.'}
            />
        </ThemeProvider>
    );
}

export default connect(({collection: {collections, tags}, user: {user}}) => ({collections, tags, user}),
    {
        getLatest,
        getTags,
        getItemsByCollectionId,
        getItemsByTag,
        download,
        changeLanguage,
        getMe
    })(Main)