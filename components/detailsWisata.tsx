import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IntroSection from "./introSection";
import ShareIcon from './shareIcon'

const templateBody =`
Lorem ipsum dolor sit amet consectetur. Nulla mattis risus a risus sodales egestas elementum. Urna integer blandit turpis nulla duis nunc vivamus nunc. Fames eu justo eget mus in sed ut. Scelerisque amet dignissim elementum consectetur venenatis faucibus risus tortor. Facilisis curabitur feugiat integer consectetur. Dignissim lobortis cursus pretium condimentum sollicitudin purus eu mattis risus. Pellentesque potenti ullamcorper vitae a amet fusce potenti vel. Id faucibus sapien curabitur adipiscing pharetra aliquam. Aliquet tincidunt est vel felis vitae purus vestibulum
<br>
Vitae risus condimentum in sagittis varius odio turpis sit. Id tellus fermentum ac vitae porttitor vitae pharetra blandit. Et malesuada sit aliquam tincidunt volutpat. Ipsum euismod elementum vitae ipsum mauris aliquam euismod felis nisi. Auctor vivamus at sed nulla quam integer nibh mattis. Cursus fermentum sit dignissim varius ipsum tellus. Lacus eu senectus commodo ipsum. Massa sed vel amet blandit. Porta malesuada in lorem pretium placerat ipsum nunc purus. At pulvinar
`

export default function DetailsWisata({ slug }: { slug: string }) {
  return (
    <div>
      <div className="flex item-center justify-end mb-8">
        <button className="
          btn text-white
          bg-gradient-to-l from-accent from-10% to-red-500 to-90%
          hover:from-yellow-500 hover:to-red-700
          outline-none
          text-xl
        ">
          <FavoriteBorderIcon sx={{ color: "#FFFFFF"}}/>
          Tambah Ke Favorite
        </button>
      </div>
      <IntroSection title="Lorem ipsum dolor sit amet consectetur" body={templateBody} titleClass="text-5xl md:text-7xl lg:text-8xl mb-8"/>
      <div className="max-w-sm">
        <ShareIcon />
      </div>
    </div>
  );
}
