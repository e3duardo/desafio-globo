describe User, type: :model do
  subject { build(:user) }

  describe 'associations' do
  end

  describe 'validations' do
    it { 
      is_expected.to define_enum_for(:role).with_values(
        backstage: 'backstage', viewer: 'viewer'
      ).backed_by_column_of_type(:string)
    }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
  end
end
