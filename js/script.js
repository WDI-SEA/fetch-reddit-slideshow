// Don't know if this array would be dynamic with whatever the person searches for
let pictures = [
    "https://v.redd.it/co23zl2kyny31",
    "https://www.reddit.com/r/Fitness/comments/d56kdn/my_15_years_and_101lbs_lost_transformation/",
    "https://www.reddit.com/r/MakeNewFriendsHere/comments/ditb8a/find_your_best_friend/",
    "https://www.reddit.com/r/survivor/comments/ddy5o5/in_defense_of_parvati/",
    "https://i.redd.it/ujlehm5ehb431.png",
    "https://www.reddit.com/r/londonr4r/comments/duue82/28_f4m_keep_me_company_this_weekend/",
    "https://www.reddit.com/r/Destiny/comments/dikv96/part_ii_dgger_asks_chat_for_advice_on_girl/",
    "https://www.reddit.com/r/5nafcirclejerk/comments/dxtsbs/my_thiughts_on_the_fnaf_fandom/",
    "https://www.reddit.com/r/DestinyTheGame/comments/cr3unv/happy_gjallarhorn_day_2019_guardians/",
    "https://www.reddit.com/r/Scams/comments/doh6kd/rscams_common_scam_master_post/",
    "https://www.reddit.com/r/copypasta/comments/dobp00/i_think_i_have_an_addiction_to_reddit/",
    "https://www.reddit.com/r/PKA/comments/dcrg3r/a_few_things_kyle_missed_while_at_summer_camp/",
    "https://www.reddit.com/r/worldbuilding/comments/dx3xo5/a_scenario_of_shifted_perspective_in_a_world_of/",
    "https://www.reddit.com/r/HFY/comments/d80o8z/oc_coronation_day_chapter_6/",
    "https://www.reddit.com/r/conlangs/comments/do1f48/earth_rocks_geology_and_associated_terminology_in/",
    "https://www.reddit.com/r/peloton/comments/dk14gs/saturday_social_media_summary_extravaganza_19/",
    "https://www.reddit.com/r/relationship_advice/comments/drlyb1/my_girlfriend_is_talking_marriage_but_im_unsure_i/",
    "https://www.reddit.com/r/MakeNewFriendsHere/comments/dj5bxf/answer_these_questions_to_find_your_best_friend_2/",
    "https://www.reddit.com/r/copypasta/comments/dvir7e/ctrlall_11122019_at_638_pm/",
    "https://www.reddit.com/r/relationship_advice/comments/cgb3fy/never_thought_id_seek_advice_on_a_cheating_so/",
    "https://www.reddit.com/r/Chihuahua/comments/dgzrde/usnc_trying_to_rehome_3_chihuahuas/",
    "https://www.reddit.com/r/reclassified/comments/cglpsq/list_of_all_known_banned_subreddits_sorted/",
    "https://www.reddit.com/r/baseball/comments/cak4ui/2019_rbaseball_trade_deadline_game_megathread_day/",
    "https://www.reddit.com/r/siblingsfromhell/comments/dprwv2/i_finally_understand_long_post/"       
]

// Going back to my original array because I couldn't get this array to work
// let images = [
//     data.data.children[0].data.url,
//     data.data.children[1].data.url,
//     data.data.children[2].data.url,
//     data.data.children[3].data.url,
//     data.data.children[4].data.url,
//     data.data.children[5].data.url,
//     data.data.children[6].data.url,
//     data.data.children[7].data.url,
//     data.data.children[8].data.url,
//     data.data.children[9].data.url
// ]


// Creating a loop to iterate through the images array and trying to figure out how to display the next image, maybe map and filter would be better?
let image = document.getElementById('myImages')
const showImages =() =>{
    for (let i = 0; i < pictures.length; i++) {
        img = new image()
    }
}

// Creating a getInput function to take what the user types into the input field and searches for that object
const getInput = () => {
    let userInput = document.getElementById('Search').value
    console.log(userInput)
    fetch(`http://www.reddit.com/search.json?q=${userInput}+nsfw.no`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('images').textContent = data.data.children[0].data.title
        console.log(data.data.children[0].data.title)
        document.getElementById('myImage').innerHTML = `<img src=${data.data.children[0].data.url}>`
        console.log(`<img src=${data.data.children[0].data.url}>`)
    })
    .catch(err => {
        console.log(err)
    })
}


// Setting event listener to the Submit button to run the getInput function
document.getElementById('Submit').addEventListener('click', getInput)

//Start slideshow
const startSlideShow = () => {
    setInterval('images', 5000)
}
startSlideShow()

const clearSlideShow = () => {
    clearInterval('images', 5000)
}
clearSlideShow()

// Setting a button to clear the interval that the images move at
document.getElementById('Clear').addEventListener('click', clearSlideShow)