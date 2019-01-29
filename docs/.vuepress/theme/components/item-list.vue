<template>
  <div class="component-item-list">
    <ul class="tags">
      <li
        class="tag"
        v-for="(tag, index) in tags"
        :key="index"
        :class="{active: tag.id === currentTag}"
        @click="currentTag = tag.id"
      >{{tag.value}}</li>
    </ul>
    <el-card
      v-for="(item, index) in currentItems"
      :key="index"
      shadow="hover"
      @click.native="handlerClick(item.link)"
    >
      <div class="title">{{ item.title }}</div>
      <div class="card-content">
        <img v-if="item.img" :src="item.img" class="image">
        <div class="mobile-title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
      <div class="date">
        <i class="el-icon-date"></i>
        {{ formarter(item.date) }}
      </div>
    </el-card>
    <el-pagination
      :class="{isMobile: isMobile}"
      :layout="isMobile ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
      :total="total"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="currNum"
      @size-change="pageSize = arguments[0]"
      @current-change="currNum = arguments[0]"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currNum: 1,
      pageSize: 5,
      pageSizes: [5, 10, 20, 50],
      currentTag: 0,
      tags: [
        {
          id: 0,
          value: "全部文章"
        },
        {
          id: 1,
          value: "Web开发"
        },
        {
          id: 2,
          value: "VueJS"
        },
        {
          id: 3,
          value: "微信小程序"
        },
        {
          id: 4,
          value: "JavaScript"
        },
        {
          id: 5,
          value: "TypeScript"
        },
        {
          id: 6,
          value: "CSS"
        },
        {
          id: 7,
          value: "开发工具"
        },
        {
          id: 8,
          value: "面试经验"
        }
      ]
    };
  },
  mounted() {
    localStorage.setItem(
      this.$page.path.substring(1, this.$page.path.length - 1),
      JSON.stringify(this.$page.frontmatter.items)
    );
  },
  computed: {
    isMobile() {
      return localStorage.getItem("isMobile") == "true";
    },

    items() {
      let items = this.$page.frontmatter.items;
      let { currentTag, tags } = this;
      if (currentTag === 0) {
        return items;
      } else {
        return items.filter(item => {
          return (
            item.keywords && item.keywords.includes(tags[currentTag].value)
          );
        });
      }
    },

    total() {
      return this.items.length || 0;
    },

    currentItems() {
      const { items, currNum, pageSize } = this;
      const start = (currNum - 1) * pageSize;
      return items.slice(start, start + pageSize);
    }
  },

  methods: {
    formarter(data) {
      return data.substring(0, 10);
    },

    handlerClick(link) {
      this.$router.push(this.$page.path + link + ".html");
    }
  }
};
</script>

<style lang="scss">
@import "../styles/config";
.component-item-list {
  max-width: 800px;
  margin: 0 auto;
  .tags {
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0;
    .tag {
      list-style: none;
      padding: 3px 10px;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        color: $configColor;
      }
      &.active {
        background: $configColor;
        color: #fff;
      }
    }
  }
  .el-card {
    margin: 10px;
    cursor: pointer;

    &:hover {
      .title,
      .mobile-title {
        color: $configColor;
      }
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 8px;
    }
    .mobile-title {
      display: none;
    }

    .date {
      text-align: right;
    }

    .card-content {
      display: flex;

      .image {
        width: 35%;
        height: 140px;
        border-radius: 6px;
        margin: 10px 20px 0px 10px;
      }

      .description {
        flex: 1;
        margin-top: 10px;
      }
    }
  }

  .el-pagination {
    margin: 30px 0;
    text-align: right;
    &.isMobile {
      text-align: center;
    }

    .btn-next,
    .btn-prev {
      background-color: #f6f6f6;
    }

    .el-pager {
      .number,
      .el-icon {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>
