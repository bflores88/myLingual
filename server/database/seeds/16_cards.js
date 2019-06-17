exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cards')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('cards').insert([
        {
          word_id: 1,
          created_by: 1,
          likes: 17,
          shares: 99,
          red_flagged: 1,
          downloads: 11,
          image_link:
            'https://target.scene7.com/is/image/Target/GUEST_f5d0cfc3-9d02-4ee0-a6c6-ed5dc09971d1?wid=488&hei=488&fmt=pjpeg',
          approved: true,
          public: true,
          active: true,
        },
        {
          word_id: 2,
          created_by: 2,
          likes: 234,
          shares: 432,
          red_flagged: 4,
          downloads: 1,
          image_link:
            'https://images.homedepot-static.com/productImages/7d09e28f-fff7-473f-84e6-ceae573d20a0/svn/everbilt-chain-806706-64_1000.jpg',
          approved: true,
          public: true,
          active: true,
        },
        {
          word_id: 3,
          created_by: 3,
          likes: 1,
          shares: 22,
          red_flagged: 21,
          downloads: 1,
          image_link:
            'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492190255/articles/2014/12/08/dutch-and-german-bikers-fighting-isis/141208-bike-gang-tease_pvvttn',
          approved: true,
          public: true,
          active: true,
        },
        {
          word_id: 4,
          created_by: 3,
          likes: 1,
          shares: 22,
          red_flagged: 21,
          downloads: 1,
          image_link: 'https://i.ytimg.com/vi/D0NPB0iic40/hqdefault.jpg',
          approved: true,
          public: true,
          active: true,
        },
        {
          word_id: 5,
          created_by: 3,
          likes: 1,
          shares: 22,
          red_flagged: 21,
          downloads: 1,
          image_link: 'https://d1ia71hq4oe7pn.cloudfront.net/photo/71547421-480px.jpg',
          approved: true,
          public: true,
          active: true,
        },
        {
          word_id: 5,
          created_by: 4,
          likes: 5,
          shares: 2,
          red_flagged: 0,
          downloads: 7,
          image_link:
            'https://images.unsplash.com/photo-1548317623-5079c3f86324?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2681&q=80',
          approved: true,
          public: true,
          active: true,
        },
        {
          word_id: 6,
          created_by: 5,
          likes: 5,
          shares: 2,
          red_flagged: 0,
          downloads: 7,
          image_link:
            'https://images.unsplash.com/photo-1543069949-a59e53ad5734?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          approved: true,
          public: true,
          active: true,
        },
      ]);
    });
};
