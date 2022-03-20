describe Answer, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:brother) }
    it { is_expected.to belong_to(:survey) }
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
  end
end
  