import UiButton from "./UiButton";

export default {
    title: 'Ui-Kit/UiButton',
    component: UiButton
}

export const Next = {
  args: {
    text: 'Next',
    handlePageChange: (page) => console.log('Page changed to:', page),
    currentPage: 1,
    totalPages: 5,
  },
};

export const Previous = {
  args: {
    text: 'Previous',
    handlePageChange: (page) => console.log('Page changed to:', page),
    currentPage: 2,
    totalPages: 5,
  },
};