import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewCards/NewsCards'
import useStyles from './styles.js'
import {Typography} from '@material-ui/core'

import wordsToNumbers from 'words-to-numbers'


const alanKey = '3fca4d1be85e03a7213a28c4b45ff0802e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {
    const classes = useStyles()
    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveAticle] = useState(-1)
    //Only one time
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles)
                    setActiveAticle(-1)
                }
                else if(command === 'highlight'){
                    console.log(activeArticle)
                    setActiveAticle((prevActiveArticle) => prevActiveArticle + 1)
                }

                else if(command === 'open'){
                   const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number
                   const article = articles[parsedNumber - 1]
                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again')
                    }
                    else if(article){
                        console.log(article.url)
                        window.open(article.url, '_blank')
                        alanBtn().playText('Opening...')
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                {newsArticles.length ? (
                    <div className={classes.infoContainer}>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                    </div>
                ) : null}
                <img src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App
