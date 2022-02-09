const server = process.env.SERVER_ADDRESS || 'http://localhost:8080';

/**
 * 
 * @param artistUsername
 * @returns {{
        username: 'example',
        email: 'example@mail.com',
        profilePicURL: 'example.com/name.jpg',
        images: [
            {
            imageURL: 'example1.com/name.jpg',
            _id: new ObjectId("12345")
            },
        ],
    }}
 */
async function getArtistInfo(artistUsername) {
    var artist;
    await fetch(server + "/api/artists/" + artistUsername)
    .then((response) => response.json())
    .then((data) => {
        artist = data.artist;
    })
    .catch(err => {
        throw new Error(err)
    });
  
    return artist;
}

async function getArtists() {
    var artists = [];
    await fetch(server + '/api/artists')
        .then((response) => response.json())
        .then((data) => {
            artists = data.artists;
            
        })
        .catch(err => {
            throw new Error(err)
        });

    return artists;
}

async function getPresignedPostData() {
    var presignedPostData;
    await fetch(server + "/api/presignedPostData/")
    .then((response) => response.json())
    .then((data) => {
        console.log("data", data);
        presignedPostData = data;
    })
    .catch(err => {
        throw new Error(err)
    });
  
    return presignedPostData;
}

async function getSignedURLData(fileName, jwt) {
    var signedURLData;
    await fetch((server + "/api/signedURL?" + "fileName=" + fileName), {
        headers: {
            'Authorization': jwt
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("signedURLData", data);
        signedURLData = data;
    })
    .catch(err => {
        throw new Error(err)
    });
  
    return signedURLData;
}

// Images are uploaded to the account with the userID contained in the jwt
async function updateArtistImages(images, jwt) {
    let response;
    await fetch(server + "/api/images", {
        method: 'POST',
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({images}),
    })
    .then((response) => response.json())
    .then((response) => {
        response = response;
    })
    .catch(err => {
        throw new Error(err)
    });

    return response;
}

/**
 * 
 * @param {string} username 
 * @param {string} email
 * @param {string} password 
 * @returns {promise} {
 *  success: boolean, 
 *  expiresIn: string,
 *  token: string,
 *  isUsernameTaken: boolean,
 *  isEmailTaken: boolean,
 * }
 */
async function submitSignupRequest(username, email, password, profilePicURL) {
    let result;
    await fetch(server + '/api/signup', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                profilePicURL,
            })
        })
        .then((response) => {
            result = response.json();
        })
        .catch(err => {
            throw new Error(err)
        })
    
    return result;
}


async function setProfilePic(username, profilePicData, jwt) {
    let presignedURLData = await getSignedURLData(profilePicData.file.name, jwt);
    var signedURL = presignedURLData.uploadURL;
    
    var imageData = profilePicData.data_url.replace(/^data:image\/\w+;base64,/, "");       
    var buffer = Buffer.from(imageData, 'base64');
    var blobData = new Blob([new Uint8Array(buffer)], {type: profilePicData.file.type});
    
    await fetch(signedURL, {
        method: 'PUT',
        mode: 'cors',
        body: blobData
    });
    var profilePicURL = signedURL.split('?')[0];

    let result;
    await fetch(server + '/api/artists/' + username + '/profilePicURL', {
            method: "POST",
            headers: {
                'Authorization': jwt,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                profilePicURL,
            })
        })
        .then((response) => {
            result = response.json();
        })
        .catch(err => {
            throw new Error(err)
        })
    
    return result;
}

/**
 * 
 * @param {string} email
 * @param {string} password 
 * @returns {promise} {
 *  err: object,
 *  user: object,
 *  token: string,
 *  expiresIn: string,
 */
async function submitLoginRequest(email, password) {
    let response;
    await fetch(server + '/api/login', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then((res) => res.json())
    .then((res) => {
        response = res;
    })
    .catch(err => {
        throw new Error(err)
    })

    return response;
}

export {
    getArtists,
    getArtistInfo,
    getPresignedPostData,
    getSignedURLData,
    updateArtistImages,
    submitSignupRequest,
    submitLoginRequest,
    setProfilePic,
};