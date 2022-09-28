const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed(){
    await Promise.all(
        getPosts().map(post => {
            return prisma.post.create({
                data: post
            })
        })
    )
}

seed()

function getPosts() {
  return [
    {
      title: "Remix  Performance Tips",
      body: "Remix is powerfull  full stack freamwork technology",
    },
    {
      title: "Casl  Performance Tips",
      body: "Casl is powerfull  auth stack",
    },
    {
      title: "Next  Performance Tips",
      body: "Next is powerfull  full stack freamwork technology",
    },
  ];
}
