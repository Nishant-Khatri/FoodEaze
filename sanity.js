import  {createClient}  from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url/";

const client= createClient({
    projectId:"6exezn6i",
    dataset:"ds2",
    useCdn: true,
    apiVersion:"2023-05-03"
});

const builder=ImageUrlBuilder(client);
export const urlFor = (source)=> builder.image(source);

export default client;