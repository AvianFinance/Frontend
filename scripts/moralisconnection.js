import Moralis from "moralis";

const connectMoralis = async () => {
    await Moralis.start({
        apiKey: "7vrliQAzsM0MKcL8wHIQMPAGnUGzWTLwxWYPoyHciUGeRR2z1vlwbxw3oX3NpGsd",
        // ...and any other configuration
    });

    return Moralis
}

export default connectMoralis;